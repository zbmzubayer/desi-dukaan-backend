import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './db/db.module';
import { CustomerModule } from './customer/customer.module';
import { SellerModule } from './seller/seller.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewModule } from './review/review.module';
import { CustomerPaymentModule } from './customer-payment/customer-payment.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
