import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-product.dto';

@Injectable()
export class OrdersService { 
  constructor(
    private prisma: PrismaService,
    private productsService: ProductsService, 
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return this.prisma.$transaction(async (prisma) => {
      let total = 0;
      const orderItems: Array<{
        productId: string;
        quantidade: number;
        preco: number;
      }> = [];

      for (const item of createOrderDto.produtos) {
        const product = await this.productsService.findOne(item.productId);

        if (product.quantidade_estoque < item.quantidade) {
          throw new BadRequestException(
            `Estoque insuficiente para ${product.nome}`,
          );
        }

        const itemTotal = product.preco * item.quantidade;
        total += itemTotal;

        orderItems.push({
          productId: item.productId,
          quantidade: item.quantidade,
          preco: Number(product.preco), 
        });
      }

      const order = await prisma.order.create({
        data: {
          total_pedido: total,
          items: {
            create: orderItems,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      for (const item of createOrderDto.produtos) {
        await this.productsService.updateStock(item.productId, item.quantidade);
      }

      return order;
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
    }

    return order;
  }

  async updateStatus(id: string, status: 'CONCLUIDO' | 'CANCELADO') {
    const order = await this.findOne(id); 

    if (status === 'CANCELADO' && order.status === 'PENDENTE') {
      for (const item of order.items) {
        await this.productsService.updateStock(
          item.productId, 
          -item.quantidade 
        );
      }
    }

    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}