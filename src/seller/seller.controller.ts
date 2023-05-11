import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveUploadedFile } from 'helper/saveUploadedFile';
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
  @UseInterceptors(FileInterceptor('Photo', saveUploadedFile))
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) sellerDto: UpdateSellerDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      sellerDto.Photo = null;
      return this.sellerService.update(uuid, sellerDto);
    } else {
      sellerDto.Photo = file.filename;
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
    res.sendFile(filename, { root: './uploads' });
  }
}
