import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ReservaController],
  providers: [PrismaService, ReservaService],
})
export class ReservaModule {}
