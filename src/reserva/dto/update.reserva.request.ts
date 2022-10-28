import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class ReservaUpdateRequest {
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    tempoEstadia: number;
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    dataReserva: string;
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    idUsuario: number;
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    idQuarto: number;
  }