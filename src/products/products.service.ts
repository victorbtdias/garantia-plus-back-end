import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async create(
    userId: number,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productModel.create({ ...createProductDto, userId });
  }

  async findAll(userId: number): Promise<Product[]> {
    return this.productModel.findAll({ where: { userId } });
  }

  async findOne(id: number, userId: number): Promise<Product> {
    const product = await this.productModel.findOne({ where: { id, userId } });

    if (!product) throw new NotFoundException('Produto não encontrado');

    return product;
  }

  async update(
    id: number,
    userId: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id, userId);

    await product.update(updateProductDto);
    return product;
  }

  async remove(id: number, userId: number): Promise<void> {
    const product = await this.findOne(id, userId);
    await product.destroy();
  }
}
