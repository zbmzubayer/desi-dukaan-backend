import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
@Entity('Sellers')
export class Seller {
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

  @Column()
  CompanyName: string;

  @Column({ nullable: true })
  CompanyLogo: string;

  @Column()
  Status: string;

  @Column({ nullable: true })
  Verified: boolean;

  @Column()
  CreatedAt: Date;

  @Column()
  ModifiedAt: Date;

  // Seller has many Products
  @OneToMany(() => Product, (product) => product.seller)
  products: Product[];
}
