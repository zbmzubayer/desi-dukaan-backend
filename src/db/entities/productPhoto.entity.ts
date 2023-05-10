import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
@Entity('ProductPhotos')
export class ProductPhoto {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column()
  Photo: string;

  // ProductPhoto has one Product
  @ManyToOne(() => Product, (product) => product.productPhotos)
  @JoinColumn({ name: 'FK_ProductId' })
  product: Product;
}
