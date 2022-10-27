import { IsNotEmpty, IsPositive } from "class-validator"

export class CreateQuartoRequest {
    @IsNotEmpty()
    disponibilidade?: boolean
    @IsPositive()
    numeroDoQuarto: number
}