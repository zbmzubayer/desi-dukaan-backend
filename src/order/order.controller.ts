import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { OrderDTO } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  // CRUD
  @Post('/create')
  create(@Body(ValidationPipe) orderDto: OrderDTO) {
    return this.orderService.create(orderDto);
  }
  @Get('/all')
  getAll() {
    return this.orderService.getAll();
  }
  @Get('/:code')
  getByUuid(@Param('code') code: string) {
    return this.orderService.getByCode(code);
  }
  // Update
  @Put('/process/:code')
  process(@Param('code') code: string) {
    return this.orderService.process(code);
  }
  @Put('/deliver/:code')
  deliver(@Param('code') code: string) {
    return this.orderService.deliver(code);
  }
  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.orderService.delete(id);
  }
  // Get Order: {customer, payment, orderDetails: {product}} by Code
  @Get('/:code/all')
  getAllInfoByCode(@Param('code') code: string) {
    return this.orderService.getAllInfoByCode(code);
  }
}
