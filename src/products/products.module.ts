import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { Product } from './product.model';
import { User } from '../users/user.model';
import { ProductController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [SequelizeModule.forFeature([Product, User])],
  controllers: [ProductController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
