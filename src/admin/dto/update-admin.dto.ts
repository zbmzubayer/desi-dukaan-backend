import { IsNotEmpty } from 'class-validator';

export class UpdateAdminDTO {
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
