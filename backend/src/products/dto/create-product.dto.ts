import { IsString, IsNumber, IsPositive, Min, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Notebook Dell' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'Eletrônicos' })
  @IsString()
  @IsNotEmpty()
  categoria: string;

  @ApiProperty({ example: 'Notebook para desenvolvimento' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ example: 3500.00 })
  @IsNumber()
  @IsPositive()
  preco: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  quantidade_estoque: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
  imagem?: string;
}
