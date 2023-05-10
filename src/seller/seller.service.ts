import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from 'src/db/entities/seller.entity';
import { Repository } from 'typeorm';
import { CreateSellerDTO } from './dto/create-seller.dto';
import { UpdateSellerDTO } from './dto/update-seller.dto';

@Injectable()
export class SellerService {
  constructor(@InjectRepository(Seller) private sellerRepo: Repository<Seller>) {}
  // CRUD
  create(sellerDto: CreateSellerDTO) {
    sellerDto.Status = 'New';
    sellerDto.CreatedAt = new Date();
    sellerDto.ModifiedAt = new Date();
    return this.sellerRepo.save(sellerDto);
  }
  getAll() {
    return this.sellerRepo.find();
  }
  getByUuid(uuid: string) {
    return this.sellerRepo.findOneBy({ Uuid: uuid });
  }
  update(uuid: string, sellerDto: UpdateSellerDTO) {
    sellerDto.ModifiedAt = new Date();
    this.sellerRepo.update({ Uuid: uuid }, sellerDto);
  }
  delete(uuid: string) {
    this.sellerRepo.delete({ Uuid: uuid });
  }
}
