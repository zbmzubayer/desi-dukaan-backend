import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerPayment } from './customerPayment.entity';
import { Order } from './order.entity';
@Entity('Payments')
export class Payment {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Type: string;

  // Payment has many Orders
  @OneToMany(() => Order, (order) => order.payment)
  orders: Order[];

  // Payment has many CustomerPayments
  @OneToMany(() => CustomerPayment, (customerPayment) => customerPayment.payment)
  customerPayments: CustomerPayment[];
}
