import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
@Entity('OrderDetails')
export class OrderDetail {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Qty: number;

  @Column()
  Price: number;

  // OrderDetail has many Products
  @ManyToOne(() => Product, (product) => product.orderDetails)
  @JoinColumn({ name: 'FK_ProductId' })
  product: Product;

  // OrderDetail has many Orders
  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'FK_OrderId' })
  order: Order;
}
