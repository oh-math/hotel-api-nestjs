import { isNotEmpty, IsNotEmpty, Length } from 'class-validator';

export class UsuarioRequest {
  @IsNotEmpty()
  @Length(147)
  nome: string;
  @IsNotEmpty()
  @Length(11)
  cpf: string;
};
