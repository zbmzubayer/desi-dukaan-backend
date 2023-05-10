import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { Product } from './product.entity';
@Entity('Reviews')
export class Review {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Rating: number;

  @Column()
  Message: string;

  // Review has one Customer
  @ManyToOne(() => Customer, (customer) => customer.reviews)
  @JoinColumn({ name: 'FK_CustomerId' })
  customer: Customer;

  // Review has one Product
  @ManyToOne(() => Product, (product) => product.reviews)
  @JoinColumn({ name: 'FK_ProductId' })
  product: Product;
}
