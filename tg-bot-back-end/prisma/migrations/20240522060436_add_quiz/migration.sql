-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "goalId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "answers" TEXT NOT NULL,
    "dateFilled" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);
