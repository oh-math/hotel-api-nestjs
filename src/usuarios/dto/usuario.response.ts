import { Expose, Transform } from 'class-transformer';

export class UsuarioResponse {
  constructor(partial?: Partial<UsuarioResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @Transform(({ value }) =>
    Buffer.isBuffer(value) ? Buffer.from(value).toString('hex') : value,
  )
  id: string;

  @Expose()
  nome: string;

  @Expose()
  cpf: string;
}
