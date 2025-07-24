import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateApiDto {
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}
