import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './product.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PrismaModule } from '@/prisma';
import { UploadModule } from '@/upload/upload.module';


@Module({
  imports: [PrismaModule, UploadModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductRepository, 
  ],
  exports: [ProductsService],
})
export class ProductsModule {}