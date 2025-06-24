/*
  Warnings:

  - You are about to drop the column `paidAt` on the `Installment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Loan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_userId_fkey";

-- AlterTable
ALTER TABLE "Installment" DROP COLUMN "paidAt";

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "loanId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
