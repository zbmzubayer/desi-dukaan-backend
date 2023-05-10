import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { CreateSellerDTO } from './dto/create-seller.dto';
import { UpdateSellerDTO } from './dto/update-seller.dto';
import { SellerService } from './seller.service';

@Controller('seller')
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
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body(ValidationPipe) sellerDto: UpdateSellerDTO) {
    return this.sellerService.update(uuid, sellerDto);
  }
  @Delete('/delete/:uuid')
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    this.sellerService.delete(uuid);
  }
}
