import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { ReviewDTO } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('api/review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}
  // CRUD
  @Post('/create')
  create(@Body(ValidationPipe) reviewDto: ReviewDTO) {
    return this.reviewService.create(reviewDto);
  }
  @Get('/all')
  getAll() {
    return this.reviewService.getAll();
  }
  @Get('/:id')
  getByUuid(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.getById(id);
  }
  @Put('/update/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) reviewDto: ReviewDTO) {
    return this.reviewService.update(id, reviewDto);
  }
  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.reviewService.delete(id);
  }
}
