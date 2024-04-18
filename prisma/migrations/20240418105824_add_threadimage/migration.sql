/*
  Warnings:

  - You are about to drop the column `image` on the `Thread` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "ThreadIlmage" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "threadId" INTEGER NOT NULL,

    CONSTRAINT "ThreadIlmage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ThreadIlmage" ADD CONSTRAINT "ThreadIlmage_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
