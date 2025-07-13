import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@ApiTags('produtos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('imagem'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Criar novo produto com imagem' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nome: { type: 'string' },
        categoria: { type: 'string' },
        descricao: { type: 'string' },
        preco: { type: 'number' },
        quantidade_estoque: { type: 'number' },
        imagem: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  create(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.productsService.create(createProductDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'nome', required: false, type: String })
  @ApiQuery({ name: 'precoMin', required: false, type: Number })
  @ApiQuery({ name: 'precoMax', required: false, type: Number })
  @ApiQuery({ name: 'orderBy', required: false, enum: ['nome', 'preco', 'createdAt'] })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
  findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('nome') nome?: string,
    @Query('precoMin', new ParseIntPipe({ optional: true })) precoMin?: number,
    @Query('precoMax', new ParseIntPipe({ optional: true })) precoMax?: number,
    @Query('orderBy') orderBy?: 'nome' | 'preco' | 'createdAt',
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.productsService.findAll({
      page: page || 1,
      limit: limit || 10,
      nome,
      precoMin,
      precoMax,
      orderBy: orderBy || 'createdAt',
      order: order || 'desc',
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID' })
  @ApiResponse({ status: 200, description: 'Produto encontrado' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('imagem'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Atualizar produto' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nome: { type: 'string' },
        categoria: { type: 'string' },
        descricao: { type: 'string' },
        preco: { type: 'number' },
        quantidade_estoque: { type: 'number' },
        imagem: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Produto atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateProductDto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.productsService.update(id, updateProductDto, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover produto' })
  @ApiResponse({ status: 200, description: 'Produto removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}