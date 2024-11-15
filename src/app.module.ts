import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumoAguaController } from './consumo_agua/consumo_agua.controller';
import { ConsumoAguaService } from './consumo_agua/consumo_agua.service';

@Module({
  imports: [],
  controllers: [AppController, ConsumoAguaController],
  providers: [AppService, ConsumoAguaService], // Adicionado ConsumoAguaService
})
export class AppModule {}
