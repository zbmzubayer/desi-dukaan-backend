import { IsNotEmpty } from 'class-validator';

export class CustomerChangePasswordDTO {
  @IsNotEmpty()
  CurrentPassword: string;
  @IsNotEmpty()
  NewPassword: string;
}
