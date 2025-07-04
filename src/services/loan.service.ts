import { InstalmentStatus, LoanStatus } from "@prisma/client";
import prisma from "../config/prisma";

interface Loan {

}

export const applyForLoan = async ({
  userId,
  typeId,
  amount,
}: {
  userId: number;
  typeId: number;
  amount: number;
}) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error('User not found');

  const loanType = await prisma.loanType.findUnique({ where: { id: typeId } });
  if (!loanType) throw new Error('Loan type not found');

  if (amount < loanType.minAmount || amount > loanType.maxAmount) {
    throw new Error(`Amount must be between ${loanType.minAmount} and ${loanType.maxAmount}`);
  }

  const interestAmount = amount * (loanType.interestRate / 100);
  const total = amount + interestAmount;
  const monthlyPayment = total / loanType.termMonths;

  const loan = await prisma.loan.create({
    data: {
      userId,
      typeId,
      amount,
      interest: loanType.interestRate,
      instalmentCount: loanType.termMonths,
      status: LoanStatus.PENDING,
    },
  });

  const instalments = Array.from({ length: loanType.termMonths }).map((_, index) => ({
    loanId: loan.id,
    amount: monthlyPayment,
    dueDate: new Date(new Date().setMonth(new Date().getMonth() + index + 1)),
    status: InstalmentStatus.PENDING,
  }));

  await prisma.instalment.createMany({ data: instalments });

  await prisma.auditLog.create({
    data: {
      userId,
      action: 'APPLY_LOAN',
      entity: 'Loan',
      entityId: loan.id,
      details: `User ${userId} applied for loan ${loan.id}`,
    },
  });

  return loan;
};
