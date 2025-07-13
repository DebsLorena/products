import { Type } from 'class-transformer';
import { IsArray, ValidateNested, IsUUID, IsPositive } from 'class-validator';

export class OrderItemDto {
  @IsUUID()
  productId: string;

  @IsPositive()
  quantidade: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  produtos: OrderItemDto[];
}