-- CreateTable
CREATE TABLE `reservas` (
    `id` BINARY(16) NOT NULL,
    `tempoEstadia` INTEGER NOT NULL,
    `dataReserva` DATETIME(3) NOT NULL,
    `checkin` DATETIME(3) NULL,
    `checkout` DATETIME(3) NULL,
    `usuarioId` VARCHAR(11) NOT NULL,
    `quartoId` INTEGER NOT NULL,

    UNIQUE INDEX `reservas_usuarioId_key`(`usuarioId`),
    UNIQUE INDEX `reservas_quartoId_key`(`quartoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quartos` (
    `id` BINARY(16) NOT NULL,
    `disponibilidade` BOOLEAN NULL DEFAULT true,
    `numeroDoQuarto` INTEGER NOT NULL,

    UNIQUE INDEX `quartos_numeroDoQuarto_key`(`numeroDoQuarto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` BINARY(16) NOT NULL,
    `nome` VARCHAR(147) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,

    UNIQUE INDEX `usuarios_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_quartoId_fkey` FOREIGN KEY (`quartoId`) REFERENCES `quartos`(`numeroDoQuarto`) ON DELETE RESTRICT ON UPDATE CASCADE;
