import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  private getImageUrl(filename: string): string {
    return `/uploads/products/${filename}`;
  }

  private extractFilename(url: string): string | null {
    if (!url) return null;
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  private async deleteFile(filename: string): Promise<void> {
    if (!filename) return;
    
    try {
      const filePath = join('./uploads/products', filename);
      await unlink(filePath);
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
    }
  }

  async create(
    createProductDto: CreateProductDto,
    file?: Express.Multer.File,
  ): Promise<Product> {
    const data: any = { ...createProductDto };
    
    if (file) {
      data.imagem = this.getImageUrl(file.filename);
    }
    
    return this.prisma.product.create({
      data,
    });
  }

  async findAll(params: {
    page?: number;
    limit?: number;
    nome?: string;
    precoMin?: number;
    precoMax?: number;
    orderBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<Product[]> {
    const { 
      page = 1, 
      limit = 10, 
      nome, 
      precoMin, 
      precoMax, 
      orderBy = 'createdAt', 
      order = 'desc' 
    } = params;

    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (nome) {
      where.nome = {
        contains: nome,
        mode: 'insensitive',
      };
    }
    
    if (precoMin !== undefined || precoMax !== undefined) {
      where.preco = {};
      if (precoMin !== undefined) {
        where.preco.gte = precoMin;
      }
      if (precoMax !== undefined) {
        where.preco.lte = precoMax;
      }
    }

    return this.prisma.product.findMany({
      where,
      skip,       
      take: limit, 
      orderBy: { [orderBy]: order },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    file?: Express.Multer.File,
  ): Promise<Product> {
    const product = await this.findOne(id);
    
    const data: any = { ...updateProductDto };
    
    if (file) {
      if (product.imagem) {
        const oldFilename = this.extractFilename(product.imagem);
        if (oldFilename) {
          await this.deleteFile(oldFilename);
        }
      }
      
      data.imagem = this.getImageUrl(file.filename);
    }
    
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Product> {
    const product = await this.findOne(id);
    
    if (product.imagem) {
      const filename = this.extractFilename(product.imagem);
      if (filename) {
        await this.deleteFile(filename);
      }
    }
    
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async updateStock(id: string, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    
    if (product.quantidade_estoque < quantity) {
      throw new Error('Estoque insuficiente');
    }
    
    return this.prisma.product.update({
      where: { id },
      data: {
        quantidade_estoque: product.quantidade_estoque - quantity,
      },
    });
  }
}