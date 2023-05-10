import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/db/entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private customerRepo: Repository<Customer>) {}
  // CRUD
  create(customerDto: CreateCustomerDTO) {
    customerDto.CreatedAt = new Date();
    customerDto.ModifiedAt = new Date();
    return this.customerRepo.save(customerDto);
  }
  getAll() {
    return this.customerRepo.find();
  }
  getByUuid(uuid: string) {
    return this.customerRepo.findOneBy({ Uuid: uuid });
  }
  update(uuid: string, customerDto: UpdateCustomerDTO) {
    customerDto.ModifiedAt = new Date();
    this.customerRepo.update({ Uuid: uuid }, customerDto);
  }
  delete(uuid: string) {
    this.customerRepo.delete({ Uuid: uuid });
  }
}
