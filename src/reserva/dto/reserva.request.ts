import { Quarto, Usuario } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class ReservaRequest {
    @IsNotEmpty()
    temposEstadia;
    @IsNotEmpty()
    dataReserva;
}