import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [DbModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
