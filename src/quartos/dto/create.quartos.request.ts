import { IsBoolean, IsNotEmpty, IsPositive } from "class-validator"

export class CreateQuartoRequest {
    @IsPositive()
    numeroDoQuarto: number
}