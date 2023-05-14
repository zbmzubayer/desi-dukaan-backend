import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/category.dto';

@Controller('api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  // CRUD
  @Post('/create')
  create(@Body(ValidationPipe) categoryDto: CategoryDTO) {
    return this.categoryService.create(categoryDto);
  }
  @Get('/all')
  getAll() {
    return this.categoryService.getAll();
  }
  @Get('/:id')
  getByUuid(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getById(id);
  }
  @Put('/update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) categoryDto: CategoryDTO) {
    return this.categoryService.update(id, categoryDto);
  }
  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.categoryService.delete(id);
  }
  // Get info Category: {products} - Nested relations
  @Get('/:id/products')
  getWithProducts(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.getWithProducts(id);
  }
  // Get info Category: {products} - Nested relations
  @Get('/name/:name/products')
  getWithProductsByName(@Param('name') name: string) {
    return this.categoryService.getWithProductsByName(name);
  }
}
