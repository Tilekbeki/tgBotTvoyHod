/*
  Warnings:

  - You are about to drop the column `result` on the `progressInfo` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "contentType" AS ENUM ('img', 'video');

-- AlterTable
ALTER TABLE "progressInfo" DROP COLUMN "result";

-- CreateTable
CREATE TABLE "result" (
    "id" SERIAL NOT NULL,
    "link" TEXT,
    "type" "contentType" NOT NULL DEFAULT 'img',
    "progressInfoId" INTEGER NOT NULL,

    CONSTRAINT "result_pkey" PRIMARY KEY ("id")
);
