import { IsNotEmpty } from 'class-validator';

export class SellerChangePasswordDTO {
  @IsNotEmpty()
  CurrentPassword: string;
  @IsNotEmpty()
  NewPassword: string;
}
