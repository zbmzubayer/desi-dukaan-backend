import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Category } from './entities/category.entity';
import { Customer } from './entities/customer.entity';
import { CustomerPayment } from './entities/customerPayment.entity';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/orderDetail.entity';
import { Payment } from './entities/payment.entity';
import { Product } from './entities/product.entity';
import { ProductPhoto } from './entities/productPhoto.entity';
import { Review } from './entities/review.entity';
import { Seller } from './entities/seller.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Admin,
      Seller,
      Customer,
      Product,
      ProductPhoto,
      Category,
      Order,
      OrderDetail,
      Payment,
      CustomerPayment,
      Review,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DbModule {}
