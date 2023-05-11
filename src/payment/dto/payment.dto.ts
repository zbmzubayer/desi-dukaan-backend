import { IsNotEmpty } from 'class-validator';

export class PaymentDTO {
  @IsNotEmpty()
  Type: string;
}
