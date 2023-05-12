import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  Email: string;
  @IsNotEmpty()
  Password: string;
}
