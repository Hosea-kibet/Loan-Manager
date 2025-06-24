import prisma from '../config/prisma';

interface CreateLoanInput {
  deposit: number;
  instalment: number;
  interest: number;
}

export const createLoan = async ({ deposit, instalment, interest }: CreateLoanInput) => {
  const interestAmount = deposit * (interest / 100);
  const totalPayable = deposit + interestAmount;
  const monthlyInstalment = parseFloat((totalPayable / instalment).toFixed(2));

  const loan = await prisma.loan.create({
    data: {
      deposit,
      interest,
      amount: totalPayable,
      instalmentCount: instalment,
      status: 'PENDING',
    },
  });

  const instalments = Array.from({ length: instalment }).map((_, i) => ({
    loanId: loan.id,
    amount: monthlyInstalment,
    dueDate: new Date(new Date().setMonth(new Date().getMonth() + i + 1)),
  }));

  await prisma.instalment.createMany({ data: instalments });
  return loan;
};

export const approveLoan = async (loanId: number) => {
  return prisma.loan.update({
    where: { id: loanId },
    data: { status: 'APPROVED' },
  });
};

export const assignUserToLoan = async ({ userId, loanId }: { userId: number; loanId: number }) => {
  const loan = await prisma.loan.findUnique({ where: { id: loanId } });
  if (!loan) throw new Error('Loan not found');
  if (loan.status !== 'APPROVED') throw new Error('Loan must be approved before assigning to users');

  const userWithLoan = await prisma.user.findUnique({ where: { id: userId } });
  if (userWithLoan?.loanId) throw new Error('User already has a loan');

  return prisma.user.update({
    where: { id: userId },
    data: { loanId },
  });
};

export const getLoanForUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      loan: {
        include: { instalments: true },
      },
    },
  });
  return user?.loan || null;
};

export const getLoanById = async (loanId: number) => {
  return prisma.loan.findUnique({
    where: { id: loanId },
    include: { users: true, instalments: true },
  });
};
