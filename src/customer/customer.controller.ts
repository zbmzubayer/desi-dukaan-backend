import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveCustomerPhoto } from 'helper/saveUploadedFile';
import { CustomerService } from './customer.service';
import { CustomerChangePasswordDTO } from './dto/change-password-customer.dto';
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
  @UseInterceptors(FileInterceptor('Photo', saveCustomerPhoto))
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) customerDto: UpdateCustomerDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      customerDto.Photo = null;
      return this.customerService.update(uuid, customerDto);
    } else {
      customerDto.Photo = file.filename;
      return this.customerService.update(uuid, customerDto);
    }
  }
  @Delete('/delete/:uuid')
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    this.customerService.delete(uuid);
  }
  // Get Photo
  @Get('/photo/:filename')
  getImage(@Param('filename') filename, @Res() res) {
    res.sendFile(filename, { root: './uploads/customer-photo' });
  }
  // Get info Customer: {orders: {orderDetails: {product}}} - Nested relations
  @Get('/:uuid/orders')
  getWithOrders(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.customerService.getWithOrders(uuid);
  }
  // Get info Customer: {Reviews: {product}} - Nested relations
  @Get('/:uuid/reviews')
  getWithReviews(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.customerService.getWithReviews(uuid);
  }
  // Get info Customer: {Reviews: {product}} - Nested relations
  @Get('/:uuid/customer-payments')
  getWithCustomerPayment(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.customerService.getWithCustomerPayment(uuid);
  }
  // Change Password
  @Patch('/change-password/:uuid')
  changePassword(@Param('uuid') uuid: string, @Body(ValidationPipe) changePasswordDto: CustomerChangePasswordDTO) {
    return this.customerService.changePassword(uuid, changePasswordDto);
  }
  // Get By Email
  @Get('/email/:email')
  getByEmail(@Param('email') email: string) {
    return this.customerService.getByEmail(email);
  }
}
