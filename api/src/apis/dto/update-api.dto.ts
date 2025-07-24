import { IsOptional, IsUrl } from 'class-validator';

export class UpdateApiDto {
  @IsOptional()
  name?: string;

  @IsUrl()
  @IsOptional()
  url?: string;
}
