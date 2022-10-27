import { IsNotEmpty, IsPositive } from "class-validator"

export class QuartoRequest {
    @IsNotEmpty()
    disponibilidade?: boolean
    @IsPositive()
    numeroDoQuarto: number
}