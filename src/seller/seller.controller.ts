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
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { saveUploadedFile } from 'helper/saveUploadedFile';
import { SellerChangePasswordDTO } from './dto/change-password-seller.dto';
import { CreateSellerDTO } from './dto/create-seller.dto';
import { UpdateSellerDTO } from './dto/update-seller.dto';
import { SellerService } from './seller.service';

@Controller('api/seller')
export class SellerController {
  constructor(private sellerService: SellerService) {}
  // CRUD
  @Post('/create')
  create(@Body(ValidationPipe) sellerDto: CreateSellerDTO) {
    return this.sellerService.create(sellerDto);
  }
  @Get('/all')
  getAll() {
    return this.sellerService.getAll();
  }
  @Get('/:uuid')
  getByUuid(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.sellerService.getByUuid(uuid);
  }
  @Put('/update/:uuid')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'Photo' }, { name: 'CompanyLogo' }], saveUploadedFile))
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) sellerDto: UpdateSellerDTO,
    @UploadedFiles() files: { Photo?: Express.Multer.File[]; CompanyLogo?: Express.Multer.File[] },
  ) {
    if (!files) {
      sellerDto.Photo = null;
      return this.sellerService.update(uuid, sellerDto);
    } else {
      console.log(files);
      sellerDto.Photo = files.Photo[0].filename;
      sellerDto.CompanyLogo = files.CompanyLogo[0].filename;
      return this.sellerService.update(uuid, sellerDto);
    }
  }
  @Delete('/delete/:uuid')
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    this.sellerService.delete(uuid);
  }
  // Get Photo
  @Get('/photo/:filename')
  getImage(@Param('filename') filename, @Res() res) {
    res.sendFile(filename, { root: './uploads/seller-photo' });
  }
  // Get all info Seller: {products} - Nested relations
  @Get('/all/info')
  getAllInfo() {
    return this.sellerService.getAllInfo();
  }
  // Get info Seller: {products} By Uuid - Nested relations
  @Get('/:uuid/products')
  getWithProducts(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.sellerService.getWithProducts(uuid);
  }
  // Get all info Seller: {products: category, {orderDetails: {order: {customer}}}, reviews} - Nested relations
  @Get('/:uuid/all')
  getAllInfoByUuid(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.sellerService.getAllInfoByUuid(uuid);
  }
  // Change Password
  @Patch('/change-password/:uuid')
  changePassword(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) changePasswordDto: SellerChangePasswordDTO,
  ) {
    return this.sellerService.changePassword(uuid, changePasswordDto);
  }
}
