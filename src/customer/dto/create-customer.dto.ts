import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDTO {
  @IsNotEmpty()
  Name: string;
  @IsNotEmpty()
  Email: string;
  @IsNotEmpty()
  Phone: string;
  @IsNotEmpty()
  Dob: Date;
  @IsNotEmpty()
  Gender: string;
  @IsNotEmpty()
  Password: string;
  CreatedAt: Date;
  ModifiedAt: Date;
}
