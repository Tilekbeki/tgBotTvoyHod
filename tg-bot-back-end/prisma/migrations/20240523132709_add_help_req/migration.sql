-- CreateTable
CREATE TABLE "HelpReq" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "nickName" TEXT NOT NULL,
    "Helped" BOOLEAN NOT NULL,

    CONSTRAINT "HelpReq_pkey" PRIMARY KEY ("id")
);
