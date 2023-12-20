-- CreateTable
CREATE TABLE "Atividade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "cenario" TEXT NOT NULL,
    "terapeutaId" INTEGER NOT NULL,
    CONSTRAINT "Atividade_terapeutaId_fkey" FOREIGN KEY ("terapeutaId") REFERENCES "Terapeuta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Terapeuta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AtividadeToPaciente" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AtividadeToPaciente_A_fkey" FOREIGN KEY ("A") REFERENCES "Atividade" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AtividadeToPaciente_B_fkey" FOREIGN KEY ("B") REFERENCES "Paciente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Terapeuta_usuario_key" ON "Terapeuta"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "_AtividadeToPaciente_AB_unique" ON "_AtividadeToPaciente"("A", "B");

-- CreateIndex
CREATE INDEX "_AtividadeToPaciente_B_index" ON "_AtividadeToPaciente"("B");
