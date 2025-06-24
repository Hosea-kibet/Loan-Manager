/*
  Warnings:

  - You are about to drop the column `instalment` on the `Loan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_loanId_fkey";

-- DropIndex
DROP INDEX "User_loanId_key";

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "instalment",
ALTER COLUMN "instalmentCount" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "loanId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
