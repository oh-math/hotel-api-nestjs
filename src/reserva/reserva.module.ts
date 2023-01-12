import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { ReservaController } from './controllers/reserva.controller';
import { ReservaService } from './services/reserva.service';

@Module({
  controllers: [ReservaController],
  providers: [PrismaService, ReservaService],
})
export class ReservaModule {}
