import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { EmailModule } from 'src/email/email.module';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [DbModule, EmailModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
