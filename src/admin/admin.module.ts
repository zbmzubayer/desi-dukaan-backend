import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { EmailModule } from 'src/email/email.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [DbModule, EmailModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
