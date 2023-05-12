import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { CustomerPaymentService } from './customer-payment.service';
import { CustomerPaymentDTO } from './dto/customer-payment.dto';

@Controller('api/customer-payment')
export class CustomerPaymentController {
  constructor(private customerPaymentService: CustomerPaymentService) {}
  // CRUD
  @Post('/create')
  create(@Body(ValidationPipe) customerPaymentDto: CustomerPaymentDTO) {
    return this.customerPaymentService.create(customerPaymentDto);
  }
  @Get('/all')
  getAll() {
    return this.customerPaymentService.getAll();
  }
  @Get('/:id')
  getByUuid(@Param('id', ParseIntPipe) id: number) {
    return this.customerPaymentService.getById(id);
  }
  @Put('/update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) customerPaymentDto: CustomerPaymentDTO) {
    return this.customerPaymentService.update(id, customerPaymentDto);
  }
  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.customerPaymentService.delete(id);
  }
}
