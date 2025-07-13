import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { BadRequestException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let prisma: PrismaService;
  let productsService: ProductsService;

  const mockProduct = {
    id: 'prod-1',
    nome: 'Test Product',
    categoria: 'Test',
    descricao: 'Test Description',
    preco: 100,
    quantidade_estoque: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockOrder = {
    id: 'order-1',
    total_pedido: 200,
    status: 'PENDENTE',
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        orderId: 'order-1',
        quantidade: 2,
        preco: 100,
        product: mockProduct,
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: {
            $transaction: jest.fn((callback) => callback({
              order: {
                create: jest.fn().mockResolvedValue(mockOrder),
              },
            })),
            order: {
              findMany: jest.fn().mockResolvedValue([mockOrder]),
              findUnique: jest.fn().mockResolvedValue(mockOrder),
              update: jest.fn().mockResolvedValue({ ...mockOrder, status: 'CONCLUIDO' }),
            },
          },
        },
        {
          provide: ProductsService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockProduct),
            updateStock: jest.fn().mockResolvedValue(mockProduct),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prisma = module.get<PrismaService>(PrismaService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  describe('create', () => {
    it('should create an order successfully', async () => {
      const createOrderDto = {
        produtos: [
          { productId: 'prod-1', quantidade: 2 },
        ],
      };

      const result = await service.create(createOrderDto);

      expect(result).toEqual(mockOrder);
      expect(productsService.findOne).toHaveBeenCalledWith('prod-1');
      expect(productsService.updateStock).toHaveBeenCalledWith('prod-1', 2);
    });

    it('should throw BadRequestException when insufficient stock', async () => {
      const createOrderDto = {
        produtos: [
          { productId: 'prod-1', quantidade: 20 }, // More than available
        ],
      };

      await expect(service.create(createOrderDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      const result = await service.findAll();
      
      expect(result).toEqual([mockOrder]);
      expect(prisma.order.findMany).toHaveBeenCalledWith({
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
    });
  });
});