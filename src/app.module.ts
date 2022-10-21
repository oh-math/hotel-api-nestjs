import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ReservaModule } from './reserva/reserva.module';

@Module({
  imports: [UsuariosModule, ReservaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
