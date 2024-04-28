import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
