import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { CustomerPaymentModule } from './customer-payment/customer-payment.module';
import { CustomerModule } from './customer/customer.module';
import { DbModule } from './db/db.module';
import { EmailModule } from './email/email.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { SellerModule } from './seller/seller.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234567890',
      database: 'DesiDukaanDB',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DbModule,
    CustomerModule,
    SellerModule,
    AdminModule,
    ProductModule,
    CategoryModule,
    OrderModule,
    PaymentModule,
    ReviewModule,
    CustomerPaymentModule,
    EmailModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
