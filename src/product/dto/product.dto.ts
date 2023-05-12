import { IsNotEmpty } from 'class-validator';

export class ProductDTO {
  Photo: string;
  @IsNotEmpty()
  Name: string;
  @IsNotEmpty()
  Desc: string;
  @IsNotEmpty()
  Qty: number;
  @IsNotEmpty()
  Waranty: string;
  @IsNotEmpty()
  Price: number;
  CreatedAt: Date;
  ModifiedAt: Date;
}
