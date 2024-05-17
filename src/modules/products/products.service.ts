import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entity/products.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async createProducts(product: ProductDto) {
    try {
      const productExist: ProductDto = await this.getProductByName(
        product.name,
      );
      if (productExist) {
        throw new ConflictException('Product already exist');
      }
      return await this.productsRepository.save(product);
    } catch (e) {
      throw e;
    }
  }

  async getProductById(id: number) {
    try {
      const product : ProductDto = await this.productsRepository.findOne({
        where: { id },
      });
      if (!product) {
        throw new NotFoundException("The product doesn't exists");
      }
      return product;
    } catch (e) {
      throw e;
    }
  }

  async getProductByName(name: string) {
    return await this.productsRepository.findOne({
      where: { name },
    });
  }

  async getAllProducts() {
    try {
      const products : ProductDto[] = await this.productsRepository.find({
        where : {deleted : false}
      });
      return products;
    } catch (e) {
      throw e;
    }
  }

  async getDeletedProducts(){
    try {
        const products : ProductDto[] = await this.productsRepository.find({
          where : {deleted : true}
        });
        return products;
      } catch (e) {
        throw e;
      }
  };

  async updateProduct(product : ProductDto, id : number){
    try {
        const productExist : ProductDto = await this.getProductById(id);
        if(!productExist){
           throw new NotFoundException("The product doesn't exists")
        }
        return await this.productsRepository.save(product)
    } catch (e) {
        console.log(e)
        throw e
    }
  }
}
