/*
  Warnings:

  - A unique constraint covering the columns `[tokenPassword]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_tokenPassword_key` ON `User`(`tokenPassword`);
