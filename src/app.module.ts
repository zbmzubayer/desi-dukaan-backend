import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'containers-us-west-117.railway.app',
      port: 7256,
      username: 'postgres',
      password: '1234567890',
      database: 'railway',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../public'),
      serveRoot: '/public/',
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
