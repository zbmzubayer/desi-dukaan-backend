import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { OrderDetail } from './orderDetail.entity';
import { Payment } from './payment.entity';
@Entity('Orders')
export class Order {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Code: string;

  @Column()
  Status: string;

  @Column()
  Phone: string;

  @Column()
  Address: string;

  @Column()
  Amount: number;

  @Column()
  PlacedAt: Date;

  @Column({ nullable: true })
  DeliveredAt: Date;

  // Order has one OrderDetail
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  // Order has one Customer
  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'FK_CustomerId' })
  customer: Customer;

  // Order has one Payment
  @ManyToOne(() => Payment, (payment) => payment.orders)
  @JoinColumn({ name: 'FK_PaymentId' })
  payment: Payment;
}
