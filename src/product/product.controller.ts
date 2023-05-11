import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { ProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('api/product')
export class ProductController {
  constructor(private productService: ProductService) {}
  // CRUD
  @Post('/create')
  create(@Body(ValidationPipe) productDto: ProductDTO) {
    return this.productService.create(productDto);
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
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body(ValidationPipe) productDto: ProductDTO) {
    return this.productService.update(uuid, productDto);
  }
  @Delete('/delete/:uuid')
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    this.productService.delete(uuid);
  }
}
