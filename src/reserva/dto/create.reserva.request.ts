import {
  IsDateString,
  IsInt,
  IsNotEmpty
} from 'class-validator';

export class CreateReservaRequest {
  constructor(partial?: Partial<CreateReservaRequest>) {
    Object.assign(this, partial);
  }

  @IsNotEmpty()
  @IsInt()
  tempoEstadia: number;
  @IsNotEmpty()
  @IsDateString()
  dataReserva: Date;
  @IsNotEmpty()
  @IsInt()
  quartoId: number;
  @IsNotEmpty()
  @IsInt()
  usuarioId: number;
}

// (alias) type Reserva = {
//   id: number;
//   tempoEstadia: number;
//   dataReserva: Date;
//   checkin: Date | null;
//   checkout: Date | null;
//   quartoId: number;
//   usuarioId: number;
// }
// import Reserva
