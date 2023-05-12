import { IsNotEmpty } from 'class-validator';

export class AdminChangePasswordDTO {
  @IsNotEmpty()
  CurrentPassword: string;
  @IsNotEmpty()
  NewPassword: string;
}
