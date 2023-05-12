import { IsNotEmpty } from 'class-validator';

export class CustomerPaymentDTO {
  @IsNotEmpty()
  AccountNo: string;
  ExpiryDate: Date;
}
