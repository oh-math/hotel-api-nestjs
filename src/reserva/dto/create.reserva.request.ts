import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class ReservaCreateRequest {
  @IsNotEmpty()
  tempoEstadia: number;
  @IsNotEmpty()
  reserva: string;
  @IsNotEmpty()
  idUsuario: number;
  @IsNotEmpty()
  idQuarto: number;
}