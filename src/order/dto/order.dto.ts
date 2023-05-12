import { IsNotEmpty } from 'class-validator';
import { OrderDetailDTO } from './orderDetail.dto';

export class OrderDTO {
  Code: string;
  Status: string;
  @IsNotEmpty()
  Phone: string;
  @IsNotEmpty()
  Address: string;
  Amount: number;
  PlacedAt: Date;
  orderDetails: OrderDetailDTO[];
}
