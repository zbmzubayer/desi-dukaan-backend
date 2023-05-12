import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/db/entities/order.entity';
import { OrderDetail } from 'src/db/entities/orderDetail.entity';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetail) private orderDetailRepo: Repository<OrderDetail>,
    private emailService: EmailService,
  ) {}
  // CRUD
  async create(orderDto) {
    orderDto.Code = 'O' + orderDto.customer + Date.now();
    orderDto.Status = 'Pending';
    orderDto.Amount = 0;
    orderDto.PlacedAt = new Date();
    const order = await this.orderRepo.save(orderDto);
    orderDto.orderDetails.forEach(async (orderDetail) => {
      orderDetail.order = order.Id;
      order.Amount += orderDetail.Price * orderDetail.Qty;
      await this.orderDetailRepo.save(orderDetail);
    });
    const mainOrder = await this.orderRepo.save(order);
    const orderAllInfo = await this.getAllInfoByCode(mainOrder.Code);
    this.emailService.sendOnOrder(orderAllInfo.customer, orderAllInfo);
    return mainOrder;
  }
  async getAll() {
    return await this.orderRepo.find({
      relations: {
        customer: true,
        orderDetails: {
          product: true,
        },
      },
    });
  }
  async getByCode(code: string) {
    return await this.orderRepo.findOneBy({ Code: code });
  }
  // Update
  async process(code: string) {
    return await this.orderRepo.update({ Code: code }, { Status: 'Processing' });
  }
  async deliver(code: string) {
    return await this.orderRepo.update({ Code: code }, { Status: 'Delivered', DeliveredAt: new Date() });
  }
  async delete(id) {
    await this.orderDetailRepo.delete({ order: id });
    return await this.orderRepo.delete({ Id: id });
  }
  // Get Order: {customer, payment, orderDetails: {product}} by Code
  async getAllInfoByCode(code: string) {
    return await this.orderRepo.findOne({
      where: { Code: code },
      relations: {
        customer: true,
        payment: true,
        orderDetails: {
          product: true,
        },
      },
    });
  }
}
