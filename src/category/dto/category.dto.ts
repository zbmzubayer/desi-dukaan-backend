import { IsNotEmpty } from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty()
  Name: string;
}
