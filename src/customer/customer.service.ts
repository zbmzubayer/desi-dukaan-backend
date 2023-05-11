import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from 'src/db/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private customerRepo: Repository<Customer>) {}
  // CRUD
  async create(customerDto: CreateCustomerDTO) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(customerDto.Password, salt);
    customerDto.Password = hashedPassword;
    customerDto.CreatedAt = new Date();
    customerDto.ModifiedAt = new Date();
    return this.customerRepo.save(customerDto);
  }
  async getAll() {
    return await this.customerRepo.find();
  }
  async getByUuid(uuid: string) {
    return await this.customerRepo.findOneBy({ Uuid: uuid });
  }
  async update(uuid: string, customerDto: UpdateCustomerDTO) {
    customerDto.ModifiedAt = new Date();
    return this.customerRepo.update({ Uuid: uuid }, customerDto);
  }
  async delete(uuid: string) {
    return await this.customerRepo.delete({ Uuid: uuid });
  }
}