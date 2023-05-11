import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [DbModule],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
