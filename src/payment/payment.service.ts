import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/db/entities/payment.entity';
import { Repository } from 'typeorm';
import { PaymentDTO } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment) private paymentRepo: Repository<Payment>) {}
  // CRUD
  async create(paymentDto: PaymentDTO) {
    return await this.paymentRepo.save(paymentDto);
  }
  async getAll() {
    return await this.paymentRepo.find();
  }
  async getById(id: number) {
    return await this.paymentRepo.findOneBy({ Id: id });
  }
  async update(id: number, paymentDto: PaymentDTO) {
    return await this.paymentRepo.update(id, paymentDto);
  }
  async delete(id: number) {
    return await this.paymentRepo.delete(id);
  }
}
