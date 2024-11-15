import { Test, TestingModule } from '@nestjs/testing';
import { ConsumoAguaController } from './consumo_agua.controller';
import { ConsumoAguaService } from './consumo_agua.service';

describe('ConsumoAguaController', () => {
  let controller: ConsumoAguaController;
  let service: ConsumoAguaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumoAguaController],
      providers: [ConsumoAguaService], // Adiciona o serviço ao módulo de teste
    }).compile();

    controller = module.get<ConsumoAguaController>(ConsumoAguaController);
    service = module.get<ConsumoAguaService>(ConsumoAguaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Exemplo de teste para o método de registrar consumo
  it('should call registrarConsumo on service', () => {
    const consumoData = { userId: 1, quantidade: 10, dataLeitura: new Date() };
    const registrarConsumoSpy = jest.spyOn(service, 'registrarConsumo').mockReturnValue({ message: 'Consumo registrado com sucesso' });

    controller.registrarConsumo(consumoData);
    expect(registrarConsumoSpy).toHaveBeenCalledWith(consumoData);
  });
});
