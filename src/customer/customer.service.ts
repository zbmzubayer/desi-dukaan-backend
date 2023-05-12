import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Customer } from 'src/db/entities/customer.entity';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    private emailService: EmailService,
  ) {}
  // CRUD
  async create(customerDto: CreateCustomerDTO) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(customerDto.Password, salt);
    customerDto.Password = hashedPassword;
    customerDto.CreatedAt = new Date();
    customerDto.ModifiedAt = new Date();
    const customer = this.customerRepo.save(customerDto);
    this.emailService.sendOnSignup((await customer).Email, (await customer).Name, (await customer).Uuid);
    return customer;
  }
  async getAll() {
    return await this.customerRepo.find({
      select: ['Id', 'Uuid', 'Name', 'Email', 'Phone', 'Address', 'CreatedAt', 'ModifiedAt'],
    });
  }
  async getByUuid(uuid: string) {
    return await this.customerRepo.findOne({
      select: ['Id', 'Uuid', 'Name', 'Email', 'Phone', 'Address', 'CreatedAt', 'ModifiedAt'],
      where: { Uuid: uuid },
    });
  }
  async update(uuid: string, customerDto: UpdateCustomerDTO) {
    customerDto.ModifiedAt = new Date();
    return this.customerRepo.update({ Uuid: uuid }, customerDto);
  }
  async delete(uuid: string) {
    return await this.customerRepo.delete({ Uuid: uuid });
  }
  // Get info Customer: {orders: {orderDetails: {product}}} - Nested relations
  async getWithOrders(uuid: string) {
    return await this.customerRepo.findOne({
      select: ['Id', 'Uuid', 'Name', 'Email', 'Phone', 'Address', 'CreatedAt', 'ModifiedAt'],
      where: { Uuid: uuid },
      relations: ['orders', 'orders.orderDetails', 'orders.orderDetails.product'],
    });
  }
  // Get info Customer: {Reviews: {product}} - Nested relations
  async getWithReviews(uuid: string) {
    return await this.customerRepo.findOne({
      select: ['Id', 'Uuid', 'Name', 'Email', 'Phone', 'Address', 'CreatedAt', 'ModifiedAt'],
      where: { Uuid: uuid },
      relations: ['reviews', 'reviews.product'],
    });
  }
  // Get info Customer: {customerPayments: {payment}} - Nested relations
  async getWithCustomerPayment(uuid: string) {
    return await this.customerRepo.findOne({
      select: ['Id', 'Uuid', 'Name', 'Email', 'Phone', 'Address', 'CreatedAt', 'ModifiedAt'],
      where: { Uuid: uuid },
      relations: ['customerPayments', 'customerPayments.payment'],
    });
  }
}
