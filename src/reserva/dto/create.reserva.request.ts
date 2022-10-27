import { IsNotEmpty } from 'class-validator';

export class ReservaRequest {
  @IsNotEmpty()
  tempoEstadia: number;
  @IsNotEmpty()
  reserva: string;
  @IsNotEmpty()
  idUsuario: number;
  @IsNotEmpty()
  idQuarto: number;
}
