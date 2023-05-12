import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/db/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepo: Repository<Category>) {}
  // CRUD
  async create(categoryDto: CategoryDTO) {
    return await this.categoryRepo.save(categoryDto);
  }
  async getAll() {
    return await this.categoryRepo.find();
  }
  async getById(id: number) {
    return await this.categoryRepo.findOneBy({ Id: id });
  }
  async update(id: number, categoryDto: CategoryDTO) {
    return await this.categoryRepo.update(id, categoryDto);
  }
  async delete(id: number) {
    return await this.categoryRepo.delete(id);
  }
  // Get info Category: {products} - Nested relations
  async getWithProducts(id: number) {
    return await this.categoryRepo.findOne({
      where: { Id: id },
      relations: ['products'],
    });
  }
}
