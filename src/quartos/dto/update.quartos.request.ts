import { IsNotEmpty } from "class-validator"

export class UpdateQuartoRequest {
    @IsNotEmpty()
    disponibilidade: boolean
}