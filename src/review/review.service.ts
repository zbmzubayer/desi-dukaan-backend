import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/db/entities/review.entity';
import { Repository } from 'typeorm';
import { ReviewDTO } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private reviewRepo: Repository<Review>) {}
  // CRUD
  async create(reviewDto: ReviewDTO) {
    return await this.reviewRepo.save(reviewDto);
  }
  async getAll() {
    return await this.reviewRepo.find();
  }
  async getById(id: number) {
    return await this.reviewRepo.findOneBy({ Id: id });
  }
  async update(id: number, reviewDto: ReviewDTO) {
    return await this.reviewRepo.update(id, reviewDto);
  }
  async delete(id: number) {
    return await this.reviewRepo.delete(id);
  }
}
