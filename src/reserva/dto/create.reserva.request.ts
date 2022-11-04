import {
  IsDateString,
  IsInt,
  IsNotEmpty
} from 'class-validator';

export class CreateReservaRequest {
  constructor(partial?: Partial<CreateReservaRequest>) {
    Object.assign(this, partial);
  }

  @IsNotEmpty()
  @IsInt()
  tempoEstadia: number;
  @IsNotEmpty()
  @IsDateString()
  reserva: string;
  @IsNotEmpty()
  @IsInt()
  quartoId: number;
  @IsNotEmpty()
  @IsInt()
  usuarioId: number;
}
