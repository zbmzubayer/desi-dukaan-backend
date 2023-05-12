import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CustomerPaymentController } from './customer-payment.controller';
import { CustomerPaymentService } from './customer-payment.service';

@Module({
  imports: [DbModule],
  controllers: [CustomerPaymentController],
  providers: [CustomerPaymentService],
})
export class CustomerPaymentModule {}
