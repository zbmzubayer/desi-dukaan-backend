import { IsNotEmpty } from 'class-validator';

export class CreateSellerDTO {
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
  @IsNotEmpty()
  CompanyName: string;
  Status: string;
  CreatedAt: Date;
  ModifiedAt: Date;
}
