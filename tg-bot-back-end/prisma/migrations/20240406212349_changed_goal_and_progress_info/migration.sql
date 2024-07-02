/*
  Warnings:

  - You are about to drop the column `progressInfoId` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `goalId` to the `progressInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "progressInfoId";

-- AlterTable
ALTER TABLE "progressInfo" ADD COLUMN     "goalId" INTEGER NOT NULL;
