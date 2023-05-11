import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { PaymentDTO } from './dto/payment.dto';
import { PaymentService } from './payment.service';

@Controller('api/payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}
  // CRUD
  @Post('/create')
  create(@Body(ValidationPipe) paymentDto: PaymentDTO) {
    return this.paymentService.create(paymentDto);
  }
  @Get('/all')
  getAll() {
    return this.paymentService.getAll();
  }
  @Get('/:id')
  getByUuid(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.getById(id);
  }
  @Put('/update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) paymentDto: PaymentDTO) {
    return this.paymentService.update(id, paymentDto);
  }
  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.paymentService.delete(id);
  }
}
