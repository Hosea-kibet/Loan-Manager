import prisma from "../config/prisma";



export const createInstalment = async ({
    loanId,
    dueDate,
    amount
}: {
    loanId: number;
    dueDate: Date;
    amount: number;
}
) => {
    return await prisma.instalment.create({
        data: {
            loanId,
            dueDate,
            amount
        }
    })
}


export const markAsPaid = async (instalmentId: number) => {
    return prisma.instalment.update({
        where: { id: instalmentId },
        data: {
            paid: true,
            paidAt: new Date(),
        },
    });
};

export const getLoanInstalments = (loanId: number) => {
    return prisma.instalment.findMany({
        where: { loanId },
        orderBy: { dueDate: 'asc' },
    })
}