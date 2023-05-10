import { IsNotEmpty } from 'class-validator';

export class UpdateCustomerDTO {
  Photo: string;
  @IsNotEmpty()
  Name: string;
  @IsNotEmpty()
  Phone: string;
  Address: string;
  @IsNotEmpty()
  Dob: Date;
  @IsNotEmpty()
  Gender: string;
  ModifiedAt: Date;
}
