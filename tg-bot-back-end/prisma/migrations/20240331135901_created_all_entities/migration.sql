-- CreateEnum
CREATE TYPE "Statuses" AS ENUM ('active', 'inProgress', 'done');

-- CreateTable
CREATE TABLE "userGoals" (
    "userId" SERIAL NOT NULL,
    "goalId" INTEGER NOT NULL,

    CONSTRAINT "userGoals_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "progressInfoId" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "createdTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progressInfo" (
    "id" SERIAL NOT NULL,
    "result" TEXT NOT NULL,
    "dateChecked" TIMESTAMP(3) NOT NULL,
    "admin" INTEGER NOT NULL,
    "status" "Statuses" NOT NULL DEFAULT 'active',
    "comment" TEXT NOT NULL,

    CONSTRAINT "progressInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL,
    "prize" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "userGoals" ADD CONSTRAINT "userGoals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userGoals" ADD CONSTRAINT "userGoals_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_progressInfoId_fkey" FOREIGN KEY ("progressInfoId") REFERENCES "progressInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
