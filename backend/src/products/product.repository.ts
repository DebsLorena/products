
import { Injectable } from '@nestjs/common';
import { Product, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}