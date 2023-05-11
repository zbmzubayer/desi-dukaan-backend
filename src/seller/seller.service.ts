import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Seller } from 'src/db/entities/seller.entity';
import { Repository } from 'typeorm';
import { CreateSellerDTO } from './dto/create-seller.dto';
import { UpdateSellerDTO } from './dto/update-seller.dto';

@Injectable()
export class SellerService {
  constructor(@InjectRepository(Seller) private sellerRepo: Repository<Seller>) {}
  // CRUD
  async create(sellerDto: CreateSellerDTO) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(sellerDto.Password, salt);
    sellerDto.Password = hashedPassword;
    sellerDto.Status = 'New';
    sellerDto.CreatedAt = new Date();
    sellerDto.ModifiedAt = new Date();
    return await this.sellerRepo.save(sellerDto);
  }
  async getAll() {
    return await this.sellerRepo.find();
  }
  async getByUuid(uuid: string) {
    return this.sellerRepo.findOneBy({ Uuid: uuid });
  }
  async update(uuid: string, sellerDto: UpdateSellerDTO) {
    sellerDto.ModifiedAt = new Date();
    return await this.sellerRepo.update({ Uuid: uuid }, sellerDto);
  }
  async delete(uuid: string) {
    return await this.sellerRepo.delete({ Uuid: uuid });
  }
}