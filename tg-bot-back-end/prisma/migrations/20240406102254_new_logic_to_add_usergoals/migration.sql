-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_categoryName_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_progressInfoId_fkey";

-- DropForeignKey
ALTER TABLE "userGoals" DROP CONSTRAINT "userGoals_goalId_fkey";

-- DropForeignKey
ALTER TABLE "userGoals" DROP CONSTRAINT "userGoals_userId_fkey";

-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "progressInfoId" DROP NOT NULL,
ALTER COLUMN "progressInfoId" SET DEFAULT 0;
