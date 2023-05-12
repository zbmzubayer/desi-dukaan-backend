import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { EmailModule } from 'src/email/email.module';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

@Module({
  imports: [DbModule, EmailModule],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
