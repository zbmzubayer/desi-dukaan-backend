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
import { saveProductPhoto } from 'helper/saveUploadedFile';
import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('api/product')
export class ProductController {
  constructor(private productService: ProductService) {}
  // CRUD
  @Post('/create')
  @UseInterceptors(FileInterceptor('Photo', saveProductPhoto))
  create(@Body(ValidationPipe) productDto: ProductDTO, @UploadedFile() file: Express.Multer.File) {
    if (!file) {
      productDto.Photo = null;
      return this.productService.create(productDto);
    } else {
      productDto.Photo = file.filename;
      return this.productService.create(productDto);
    }
  }
  @Get('/all')
  getAll() {
    return this.productService.getAll();
  }
  @Get('/:uuid')
  getByUuid(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.productService.getByUuid(uuid);
  }
  @Put('/update/:uuid')
  @UseInterceptors(FileInterceptor('Photo', saveProductPhoto))
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) productDto: ProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      productDto.Photo = null;
    } else {
      productDto.Photo = file.filename;
      return this.productService.update(uuid, productDto);
    }
  }
  @Delete('/delete/:uuid')
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    this.productService.delete(uuid);
  }
  // Get Photo
  @Get('/photo/:filename')
  getImage(@Param('filename') filename, @Res() res) {
    res.sendFile(filename, { root: './uploads/product-photo' });
  }
}
