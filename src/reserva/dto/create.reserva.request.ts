import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class CreateReservaRequest {
  constructor(partial?: Partial<CreateReservaRequest>) {
    Object.assign(this, partial);
  }
  @IsNotEmpty()
  @IsNumber()
  tempoEstadia: number;
  @IsNotEmpty()
  @IsString()
  dataReserva: string;
  @IsOptional()
  checkin?: Date;
  @IsOptional()
  checkout?: Date;
  @IsNotEmpty()
  quartoId: number;
  @IsNotEmpty()
  usuarioId: string;
}
