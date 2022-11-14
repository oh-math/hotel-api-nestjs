import { Expose, Transform } from 'class-transformer';

export class QuartoResponse {
  constructor(partial?: Partial<QuartoResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @Transform(({ value }) =>
    Buffer.isBuffer(value) ? Buffer.from(value).toString('hex') : value,
  )
  id: string;

  @Expose()
  disponibilidade: boolean;
  @Expose()
  numeroDoQuarto: number;
}
