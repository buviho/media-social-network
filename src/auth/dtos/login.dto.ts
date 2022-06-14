import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true, type: 'string', description: 'Email' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, type: 'string', description: 'Password' })
  @IsString()
  @MinLength(6)
  password: string;
}
