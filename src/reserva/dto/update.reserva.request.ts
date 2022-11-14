import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateReservaRequest {
  constructor(partial?: Partial<UpdateReservaRequest>) {
    Object.assign(this, partial);
  }

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  tempoEstadia?: number;
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  dataReserva?: string | Date;
  @IsOptional()
  checkin?: Date;
  @IsOptional()
  checkout?: Date;
}
