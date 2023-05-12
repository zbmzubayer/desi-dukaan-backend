import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerPayment } from 'src/db/entities/customerPayment.entity';
import { Repository } from 'typeorm';
import { CustomerPaymentDTO } from './dto/customer-payment.dto';

@Injectable()
export class CustomerPaymentService {
  constructor(@InjectRepository(CustomerPayment) private customerPaymentRepo: Repository<CustomerPayment>) {}
  // CRUD
  async create(customerPaymentDto: CustomerPaymentDTO) {
    return await this.customerPaymentRepo.save(customerPaymentDto);
  }
  async getAll() {
    return await this.customerPaymentRepo.find();
  }
  async getById(id: number) {
    return await this.customerPaymentRepo.findOneBy({ Id: id });
  }
  async update(id: number, customerPaymentDto: CustomerPaymentDTO) {
    return await this.customerPaymentRepo.update(id, customerPaymentDto);
  }
  async delete(id: number) {
    return await this.customerPaymentRepo.delete(id);
  }
}
