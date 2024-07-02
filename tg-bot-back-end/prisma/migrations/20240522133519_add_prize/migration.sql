/*
  Warnings:

  - You are about to drop the column `prize` on the `Category` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "prizeType" AS ENUM ('link', 'promo', 'file', 'another');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "prize";

-- CreateTable
CREATE TABLE "Prize" (
    "id" SERIAL NOT NULL,
    "type" "prizeType" NOT NULL,
    "content" TEXT NOT NULL,
    "goalId" INTEGER NOT NULL,

    CONSTRAINT "Prize_pkey" PRIMARY KEY ("id")
);
