import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('pedidos')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo pedido (público)' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou estoque insuficiente' })
  create(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pedido por ID (público)' })
  @ApiResponse({ status: 200, description: 'Pedido encontrado' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os pedidos (requer login)' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar status do pedido (requer login)' })
  @ApiResponse({ status: 200, description: 'Status atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'CONCLUIDO' | 'CANCELADO',
  ) {
    return this.ordersService.updateStatus(id, status);
  }
}
