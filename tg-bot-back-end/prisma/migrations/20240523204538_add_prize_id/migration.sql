/*
  Warnings:

  - Added the required column `prizeId` to the `userPrizes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userPrizes" ADD COLUMN     "prizeId" INTEGER NOT NULL;
