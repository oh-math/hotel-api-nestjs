import { Expose, Transform } from 'class-transformer';

export class ReservaResponse {
  constructor(partial?: Partial<ReservaResponse>) {
    Object.assign(this, partial);
  }

  @Expose()
  @Transform(({ value }) =>
    Buffer.isBuffer(value) ? Buffer.from(value).toString('hex') : value,
  )
  id: string;

  @Expose()
  tempoEstadia: number;

  @Expose()
  dataReserva: string;

  @Expose()
  checkin?: Date;

  @Expose()
  checkout?: Date;

  @Expose()
  quartoId: number;

  @Expose()
  usuarioId: string;
}
