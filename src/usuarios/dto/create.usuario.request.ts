import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UsuarioRequest {
  @IsNotEmpty()
  @IsString()
  @Length(3, 147)
  nome: string;
  @IsNotEmpty()
  @IsString()
  @Length(11)
  cpf: string;
};
