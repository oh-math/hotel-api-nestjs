import {
  IsDateString,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional
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
  dataReserva: string;
  @IsOptional()
  checkin?: Date
  @IsOptional()
  checkout?: Date
  @IsNotEmpty()
  quartoId: number;
  @IsNotEmpty()
  usuarioId: string;
}
