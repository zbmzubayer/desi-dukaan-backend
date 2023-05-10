import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { UpdateCustomerDTO } from './dto/update-customer.dto';

@Controller('api/customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  // CRUD
  @Post('/create')
  create(@Body(ValidationPipe) customerDto: CreateCustomerDTO) {
    return this.customerService.create(customerDto);
  }
  @Get('/all')
  getAll() {
    return this.customerService.getAll();
  }
  @Get('/:uuid')
  getByUuid(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.customerService.getByUuid(uuid);
  }
  @Put('/update/:uuid')
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body(ValidationPipe) customerDto: UpdateCustomerDTO) {
    return this.customerService.update(uuid, customerDto);
  }
  @Delete('/delete/:uuid')
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    this.customerService.delete(uuid);
  }
}
