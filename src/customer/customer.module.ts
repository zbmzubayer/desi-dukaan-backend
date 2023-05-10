import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [DbModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
