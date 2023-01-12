import { Module } from '@nestjs/common';
import { QuartosModule } from './quarto/quartos.module';
import { ReservaModule } from './reserva/reserva.module';
import { UsuariosModule } from './usuario/usuarios.module';

@Module({
  imports: [UsuariosModule, ReservaModule, QuartosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
