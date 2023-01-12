import { Module } from '@nestjs/common';
import { QuartosService } from './services/quartos.service';
import { QuartosController } from './controllers/quartos.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [QuartosController],
  providers: [QuartosService, PrismaService],
})
export class QuartosModule {}
