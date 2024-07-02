-- AlterEnum
ALTER TYPE "Statuses" ADD VALUE 'canceled';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "chatId" DROP DEFAULT;
DROP SEQUENCE "User_chatId_seq";
