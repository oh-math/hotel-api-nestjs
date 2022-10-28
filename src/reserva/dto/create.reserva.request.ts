import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReservaCreateRequest {
  @IsNotEmpty()
  @IsNumber()
  tempoEstadia: number;
  @IsNotEmpty()
  @IsString()
  reserva: string;
  @IsNotEmpty()
  @IsNumber()
  idUsuario: number;
  @IsNotEmpty()
  @IsNumber()
  idQuarto: number;
}