import prisma from "../config/prisma"



export const getAllUsers = async () => {
    return await prisma.user.findMany({
        select:{
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
}


export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
};