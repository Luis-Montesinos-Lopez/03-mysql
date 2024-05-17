import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/products.dto';

@Controller('api/v1/products')
@ApiTags('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async createProducts(@Body() product: ProductDto) {
    return await this.productsService.createProducts(product);
  }

  @Get()
  async getAllProducts() {
    try {
      return await this.productsService.getAllProducts();
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  @Get('/deleted')
  async getDeletedProducts() {
    try {
      return await this.productsService.getDeletedProducts();
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  @Get('/:id')
  async getProductById(@Param('id') id: number) {
    return await this.productsService.getProductById(id);
  }

  @Put('/:id')
  async updateProducts(@Body() product: ProductDto, @Param('id') id : number) {
    try {
      return await this.productsService.updateProduct(product, id);
    } catch (e) {
      return e;
    }
  }
}
