/*
  Warnings:

  - Made the column `userId` on table `Loan` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Loan" DROP CONSTRAINT "Loan_userId_fkey";

-- AlterTable
ALTER TABLE "Loan" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Loan" ADD CONSTRAINT "Loan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
