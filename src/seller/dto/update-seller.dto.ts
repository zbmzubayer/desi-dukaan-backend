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
  CompanyName: string;
  CompanyLogo: string;
  Status: string;
  ModifiedAt: Date;
}
