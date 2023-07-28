/*
  Warnings:

  - Added the required column `userId` to the `S3File` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_S3File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "preSignedUrl" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "bucketName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "versionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "S3File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_S3File" ("bucketName", "createdAt", "id", "mimeType", "name", "path", "preSignedUrl", "updatedAt", "version", "versionId") SELECT "bucketName", "createdAt", "id", "mimeType", "name", "path", "preSignedUrl", "updatedAt", "version", "versionId" FROM "S3File";
DROP TABLE "S3File";
ALTER TABLE "new_S3File" RENAME TO "S3File";
CREATE UNIQUE INDEX "S3File_preSignedUrl_key" ON "S3File"("preSignedUrl");
CREATE UNIQUE INDEX "S3File_versionId_key" ON "S3File"("versionId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
