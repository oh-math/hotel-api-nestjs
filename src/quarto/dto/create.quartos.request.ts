import { IsNumber, IsPositive } from 'class-validator';

export class CreateQuartoRequest {
  constructor(partial?: Partial<CreateQuartoRequest>) {
    Object.assign(this, partial);
  }
  @IsPositive()
  @IsNumber()
  numeroDoQuarto: number;
}
