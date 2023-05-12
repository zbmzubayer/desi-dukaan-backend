import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Seller } from 'src/db/entities/seller.entity';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { CreateSellerDTO } from './dto/create-seller.dto';
import { UpdateSellerDTO } from './dto/update-seller.dto';

@Injectable()
export class SellerService {
  constructor(@InjectRepository(Seller) private sellerRepo: Repository<Seller>, private emailService: EmailService) {}
  // CRUD
  async create(sellerDto: CreateSellerDTO) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(sellerDto.Password, salt);
    sellerDto.Password = hashedPassword;
    sellerDto.Status = 'New';
    sellerDto.CreatedAt = new Date();
    sellerDto.ModifiedAt = new Date();
    const seller = await this.sellerRepo.save(sellerDto);
    this.emailService.sendOnSignup((await seller).Email, (await seller).Name, (await seller).Uuid);
    return seller;
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
  // Get all info Seller: {products} - Nested relations
  async getAllInfo() {
    return await this.sellerRepo.find({
      relations: ['products'],
    });
  }
  // Get info Seller: {products} - Nested relations
  async getWithProducts(uuid: string) {
    return await this.sellerRepo.findOne({
      where: { Uuid: uuid },
      relations: ['products'],
    });
  }
  // Get all info Seller: {products: category, {orderDetails: {order: {customer}}}, reviews} - Nested relations
  async getAllInfoByUuid(uuid: string) {
    return await this.sellerRepo.findOne({
      where: { Uuid: uuid },
      relations: [
        'products',
        'products.category',
        'products.orderDetails',
        'products.orderDetails.order',
        'products.orderDetails.order.customer',
        'products.orderDetails.order.payment',
        'products.reviews',
      ],
    });
  }
}
