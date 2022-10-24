import { Module } from '@nestjs/common';
import { QuartosModule } from './quartos/quartos.module';
import { ReservaModule } from './reserva/reserva.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule, ReservaModule, QuartosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
