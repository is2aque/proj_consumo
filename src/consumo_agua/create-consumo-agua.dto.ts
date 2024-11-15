import { IsInt, IsPositive, IsDate } from 'class-validator';

export class CreateConsumoAguaDto {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  quantidade: number;

  @IsDate()
  dataLeitura: Date;
}
