import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async create(@Req() req, @Body() createProductDto: CreateProductDto) {
    const { userId } = req.user;
    return this.productService.create(userId, createProductDto);
  }

  @Get()
  async findAll(@Req() req) {
    const { userId } = req.user;
    return this.productService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const { userId } = req.user;
    return this.productService.findOne(id, userId);
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const { userId } = req.user;
    return this.productService.update(id, userId, updateProductDto);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const { userId } = req.user;
    return this.productService.remove(id, userId);
  }
}
