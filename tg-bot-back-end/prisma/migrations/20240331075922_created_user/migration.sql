-- CreateTable
CREATE TABLE "User" (
    "chatId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("chatId")
);
