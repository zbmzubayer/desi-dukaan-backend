import { IsNotEmpty } from 'class-validator';

export class UpdateSellerDTO {
  Photo: string;
  @IsNotEmpty()
  Name: string;
  @IsNotEmpty()
  Phone: string;
  @IsNotEmpty()
  Dob: Date;
  @IsNotEmpty()
  Gender: string;
  @IsNotEmpty()
  Address: string;
  CompanyName: string;
  CompanyLogo: string;
  ModifiedAt: Date;
}
