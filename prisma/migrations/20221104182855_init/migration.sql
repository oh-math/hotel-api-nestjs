-- CreateTable
CREATE TABLE `reservas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tempoEstadia` INTEGER NOT NULL,
    `dataReserva` DATETIME(3) NOT NULL,
    `checkin` DATETIME(3) NULL,
    `checkout` DATETIME(3) NULL,
    `quartoId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    UNIQUE INDEX `reservas_quartoId_key`(`quartoId`),
    UNIQUE INDEX `reservas_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quartos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `disponibilidade` BOOLEAN NULL DEFAULT true,
    `numeroDoQuarto` INTEGER NOT NULL,

    UNIQUE INDEX `quartos_numeroDoQuarto_key`(`numeroDoQuarto`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(147) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,

    UNIQUE INDEX `usuarios_cpf_key`(`cpf`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservas` ADD CONSTRAINT `reservas_quartoId_fkey` FOREIGN KEY (`quartoId`) REFERENCES `quartos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
