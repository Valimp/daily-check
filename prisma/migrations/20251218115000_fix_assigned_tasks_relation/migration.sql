/*
  Warnings:

  - You are about to drop the column `userId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TaskCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[apartmentId,name]` on the table `TaskCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apartmentId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apartmentId` to the `TaskCategory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApartmentRole" AS ENUM ('owner', 'member');

-- DropIndex
DROP INDEX "Task_userId_idx";

-- DropIndex
DROP INDEX "TaskCategory_userId_idx";

-- DropIndex
DROP INDEX "TaskCategory_userId_name_key";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "userId",
ADD COLUMN     "apartmentId" TEXT NOT NULL,
ADD COLUMN     "assignedToUserId" TEXT;

-- AlterTable
ALTER TABLE "TaskCategory" DROP COLUMN "userId",
ADD COLUMN     "apartmentId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Apartment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApartmentMember" (
    "id" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "ApartmentRole" NOT NULL DEFAULT 'member',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApartmentMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Apartment_ownerId_idx" ON "Apartment"("ownerId");

-- CreateIndex
CREATE INDEX "ApartmentMember_userId_idx" ON "ApartmentMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ApartmentMember_apartmentId_userId_key" ON "ApartmentMember"("apartmentId", "userId");

-- CreateIndex
CREATE INDEX "Task_apartmentId_idx" ON "Task"("apartmentId");

-- CreateIndex
CREATE INDEX "Task_assignedToUserId_idx" ON "Task"("assignedToUserId");

-- CreateIndex
CREATE INDEX "TaskCategory_apartmentId_idx" ON "TaskCategory"("apartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskCategory_apartmentId_name_key" ON "TaskCategory"("apartmentId", "name");

-- AddForeignKey
ALTER TABLE "ApartmentMember" ADD CONSTRAINT "ApartmentMember_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApartmentMember" ADD CONSTRAINT "ApartmentMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCategory" ADD CONSTRAINT "TaskCategory_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToUserId_fkey" FOREIGN KEY ("assignedToUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "Apartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
