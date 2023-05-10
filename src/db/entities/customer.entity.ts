import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerPayment } from './customerPayment.entity';
import { Order } from './order.entity';
import { Review } from './review.entity';
@Entity('Customers')
export class Customer {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  @Generated('uuid')
  Uuid: string;

  @Column({ nullable: true })
  Photo: string;

  @Column()
  Name: string;

  @Column()
  Email: string;

  @Column()
  Phone: string;

  @Column({ nullable: true })
  Address: string;

  @Column()
  Dob: Date;

  @Column()
  Gender: string;

  @Column()
  Password: string;

  @Column({ nullable: true })
  Verified: boolean;

  @Column()
  CreatedAt: Date;

  @Column()
  ModifiedAt: Date;

  // Customer has many Orders
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  // Customer has many Reviews
  @OneToMany(() => Review, (review) => review.customer)
  reviews: Review[];

  // Customer has many CustomerPayments
  @OneToMany(() => CustomerPayment, (customerPayment) => customerPayment.customer)
  customerPayments: CustomerPayment[];
}
