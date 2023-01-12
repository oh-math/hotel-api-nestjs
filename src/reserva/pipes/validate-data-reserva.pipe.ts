import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import Joi from 'joi';
import moment from 'moment';
import { CreateReservaRequest } from '../dto/create.reserva.request';

@Injectable()
export class ValidateDataReservaPipe {
  constructor() {}

  async transform(
    payload: CreateReservaRequest,
  ): Promise<CreateReservaRequest> {
    const { dataReserva, tempoEstadia } = payload;

    const dataAtual = moment(new Date());
    const reservaData = moment(dataReserva.toString());

    const isDataAfter = reservaData.isAfter(dataAtual.add(30, 'd'));
    const isDataBefore = reservaData.isBefore(moment());
    const dataBetween = tempoEstadia > 3 || tempoEstadia <= 0;
    const validateDateObj = {
      isAfter: isDataAfter,
      isBefore: isDataBefore,
    };

    Joi.assert(
      isDataAfter,
      Joi.boolean().equal(false),
      new BadRequestException({
        errors: [
          {
            code: HttpStatus.BAD_REQUEST,
            detail:
              'Não é possivel fazer uma reserva com mais de 30 dias de antecedência',
          },
        ],
      }),
    );
    Joi.assert(
      isDataBefore,
      Joi.boolean().equal(false),
      new BadRequestException({
        errors: [
          {
            code: HttpStatus.BAD_REQUEST,
            detail:
              'Não é possivel fazer uma reserva no passado ou do dia atual',
          },
        ],
      }),
    );
    Joi.assert(
      dataBetween,
      Joi.boolean().equal(false),
      new BadRequestException({
        errors: [
          {
            code: HttpStatus.BAD_REQUEST,
            detail:
              'Não é possivel ter uma estadia superior a 3 dias ou inferior a 1 dia',
          },
        ],
      }),
    );
    return payload;
  }
}
