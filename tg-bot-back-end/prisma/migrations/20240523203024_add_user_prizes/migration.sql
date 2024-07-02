/*
  Warnings:

  - You are about to drop the column `goalId` on the `Prize` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Prize" DROP COLUMN "goalId";

-- CreateTable
CREATE TABLE "userPrizes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "goalId" INTEGER NOT NULL,

    CONSTRAINT "userPrizes_pkey" PRIMARY KEY ("id")
);
