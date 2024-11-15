import { Injectable } from '@nestjs/common';
import { ConsumoAgua } from './consumo_agua.model';

@Injectable()
export class ConsumoAguaService {
  private consumos: ConsumoAgua[] = [];  // Lista para armazenar os dados de consumo

  // Método para registrar o consumo de água
  registrarConsumo(consumo: ConsumoAgua) {
    this.consumos.push(consumo);  // Adiciona o consumo à lista
    return { message: 'Consumo registrado com sucesso' };
  }

  // Método para obter o histórico de consumo de um usuário em um período
  obterHistorico(userId: number, dataInicio: Date, dataFim: Date): ConsumoAgua[] {
    // Normaliza as datas para remover a parte da hora
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    inicio.setHours(0, 0, 0, 0);  // Meia-noite
    fim.setHours(23, 59, 59, 999); // Final do dia

    return this.consumos.filter(consumo => {
      const consumoData = new Date(consumo.dataLeitura);
      consumoData.setHours(0, 0, 0, 0); // Normaliza a data de consumo para a meia-noite
      return consumo.userId === userId &&
             consumoData >= inicio &&
             consumoData <= fim;
    });
  }

  // Método para verificar se o consumo é elevado comparado ao mês anterior
  verificarConsumoElevado(userId: number): boolean {
    const consumosUsuario = this.consumos.filter(consumo => consumo.userId === userId);

    // Verifica se existem pelo menos dois registros para comparação
    if (consumosUsuario.length < 2) {
      return false;  // Não há dados suficientes para comparar
    }

    // Compara o consumo atual com o anterior
    const consumoAtual = consumosUsuario[consumosUsuario.length - 1].quantidade;
    const consumoAnterior = consumosUsuario[consumosUsuario.length - 2].quantidade;

    return consumoAtual > consumoAnterior;  // Retorna true se o consumo atual for maior
  }
}
