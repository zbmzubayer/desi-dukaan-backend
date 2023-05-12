import { IsNotEmpty } from 'class-validator';

export class OrderDetailDTO {
  @IsNotEmpty()
  Qty: number;
  @IsNotEmpty()
  Price: number;
}
