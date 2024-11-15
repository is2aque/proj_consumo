import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ConsumoAguaService } from './consumo_agua.service';
import { ConsumoAgua } from './consumo_agua.model';

@Controller('consumo_agua')
export class ConsumoAguaController {
  constructor(private readonly consumoAguaService: ConsumoAguaService) {}

  // Rota para registrar consumo de água (POST)
  @Post()
  registrarConsumo(@Body() consumo: ConsumoAgua) {
    return this.consumoAguaService.registrarConsumo(consumo);
  }

  // Rota para obter histórico de consumo (GET)
  @Get('historico')
  obterHistorico(
    @Query('userId') userId: number,
    @Query('dataInicio') dataInicio: Date,
    @Query('dataFim') dataFim: Date,
  ) {
    return this.consumoAguaService.obterHistorico(userId, dataInicio, dataFim);
  }

  // Rota para verificar consumo elevado (GET)
  @Get('alerta')
  verificarConsumoElevado(@Query('userId') userId: number) {
    return { alerta: this.consumoAguaService.verificarConsumoElevado(userId) };
  }
}
