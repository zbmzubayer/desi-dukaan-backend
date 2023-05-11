import { IsNotEmpty } from 'class-validator';

export class ReviewDTO {
  @IsNotEmpty()
  Rating: number;
  @IsNotEmpty()
  Message: string;
}
