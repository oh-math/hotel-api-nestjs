import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import * as CpfCnpjValidator from 'cpf-cnpj-validator';
import Joi from 'joi';
import { CreateUsuarioRequest } from '../dto/create.usuario.request';

@Injectable()
export class ValidateValidCPFPipe {
  constructor() {}

  async transform(
    payload: CreateUsuarioRequest,
  ): Promise<CreateUsuarioRequest> {
    const { cpf } = payload;
    const cpfIsValid = CpfCnpjValidator.cpf.isValid(cpf);

    Joi.assert(
      cpfIsValid,
      Joi.boolean().equal(true),
      new BadRequestException({
        errors: [
          {
            code: HttpStatus.BAD_REQUEST,
            detail: 'Invalid CPF',
          },
        ],
      }),
    );

    return payload;
  }
}
