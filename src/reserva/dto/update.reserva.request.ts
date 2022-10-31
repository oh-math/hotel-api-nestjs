import { Quarto, Usuario } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class ReservaUpdateRequest {
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    tempoEstadia?: number;
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    dataReserva?: string | Date;
  }