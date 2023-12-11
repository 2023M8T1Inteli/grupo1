/*
  Warnings:

  - Added the required column `data` to the `Atividade` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "upImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario" TEXT NOT NULL,
    "foto" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Atividade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "cenario" TEXT NOT NULL,
    "terapeutaId" INTEGER NOT NULL,
    CONSTRAINT "Atividade_terapeutaId_fkey" FOREIGN KEY ("terapeutaId") REFERENCES "Terapeuta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Atividade" ("cenario", "codigo", "id", "terapeutaId") SELECT "cenario", "codigo", "id", "terapeutaId" FROM "Atividade";
DROP TABLE "Atividade";
ALTER TABLE "new_Atividade" RENAME TO "Atividade";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "upImage_usuario_key" ON "upImage"("usuario");
