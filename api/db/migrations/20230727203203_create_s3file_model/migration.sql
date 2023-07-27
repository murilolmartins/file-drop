-- CreateTable
CREATE TABLE "S3File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "preSignedUrl" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "bucketName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "versionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "S3File_preSignedUrl_key" ON "S3File"("preSignedUrl");

-- CreateIndex
CREATE UNIQUE INDEX "S3File_versionId_key" ON "S3File"("versionId");
