import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  const mockProduct = {
    id: '1',
    nome: 'Test Product',
    categoria: 'Test',
    descricao: 'Test Description',
    preco: 100,
    quantidade_estoque: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: jest.fn().mockResolvedValue(mockProduct),
              findUnique: jest.fn().mockResolvedValue(mockProduct),
              findMany: jest.fn().mockResolvedValue([mockProduct]),
              update: jest.fn().mockResolvedValue(mockProduct),
              delete: jest.fn().mockResolvedValue(mockProduct),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const dto = {
        nome: 'Test Product',
        categoria: 'Test',
        descricao: 'Test Description',
        preco: 100,
        quantidade_estoque: 10,
      };

      const result = await service.create(dto);

      expect(result).toEqual(mockProduct);
      expect(prisma.product.create).toHaveBeenCalledWith({
        data: dto,
      });
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundException when product not found', async () => {
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateStock', () => {
    it('should update product stock', async () => {
      const result = await service.updateStock('1', 5);
      
      expect(result).toEqual(mockProduct);
      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          quantidade_estoque: 5, // 10 - 5
        },
      });
    });

    it('should throw error when insufficient stock', async () => {
      await expect(service.updateStock('1', 15)).rejects.toThrow('Estoque insuficiente');
    });
  });
});