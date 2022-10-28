import { IsNumber, IsPositive } from "class-validator"

export class CreateQuartoRequest {
    @IsPositive()
    @IsNumber()
    numeroDoQuarto: number
}