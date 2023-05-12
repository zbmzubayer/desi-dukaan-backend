import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { EmailModule } from 'src/email/email.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [DbModule, EmailModule],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
