import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/db/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}
  // CRUD
  async create(productDto: ProductDTO) {
    productDto.CreatedAt = new Date();
    productDto.ModifiedAt = new Date();
    return await this.productRepo.save(productDto);
  }
  async getAll() {
    return await this.productRepo.find();
  }
  async getByUuid(uuid: string) {
    return await this.productRepo.findOneBy({ Uuid: uuid });
  }
  async update(uuid: string, productDto: ProductDTO) {
    productDto.ModifiedAt = new Date();
    return await this.productRepo.update({ Uuid: uuid }, productDto);
  }
  async delete(uuid: string) {
    return await this.productRepo.delete({ Uuid: uuid });
  }
}
