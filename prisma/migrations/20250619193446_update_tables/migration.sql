/*
  Warnings:

  - You are about to drop the column `termMonths` on the `Loan` table. All the data in the column will be lost.
  - The `status` column on the `Loan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[loanId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `loanId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "LoanStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_loanId_fkey";

-- AlterTable
ALTER TABLE "Loan" DROP COLUMN "termMonths",
ADD COLUMN     "instalment" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "instalmentCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "deposit" DROP DEFAULT,
DROP COLUMN "status",
ADD COLUMN     "status" "LoanStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "loanId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_loanId_key" ON "User"("loanId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES "Loan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
