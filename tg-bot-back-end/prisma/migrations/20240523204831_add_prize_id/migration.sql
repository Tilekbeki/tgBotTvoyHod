-- CreateTable
CREATE TABLE "userPrizes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "goalId" INTEGER NOT NULL,
    "prizeId" INTEGER NOT NULL,

    CONSTRAINT "userPrizes_pkey" PRIMARY KEY ("id")
);
