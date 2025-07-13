import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateOrderDto) {}