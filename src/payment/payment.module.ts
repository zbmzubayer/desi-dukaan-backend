import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [DbModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
