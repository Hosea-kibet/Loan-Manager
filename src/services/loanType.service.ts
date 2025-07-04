import prisma from "../config/prisma"

interface LoanTypeInput {
    name: string;
    description?: string;
    maxAmount: number;
    minAmount: number;
    interestRate: number;
    termMonths: number;
}

export  const createLoanType = async (data:LoanTypeInput) => {
    return prisma.loanType.create({ data });
}  

export const  loanTypes = async ()=> {
    return prisma.loanType.findMany({})
}