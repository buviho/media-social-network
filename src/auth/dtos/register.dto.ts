import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserGender } from '../../database/models/user.entity';

export class RegisterDto {
  @ApiProperty({ required: true, type: 'string', description: 'Email' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: true, type: 'string', description: 'Password' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ required: true, type: 'string', description: 'Email' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    type: 'enum',
    enum: UserGender,
    description: 'Gender',
  })
  @IsNotEmpty()
  gender: UserGender;

  @ApiProperty({ required: true, type: 'date', description: 'Date of birth' })
  dateOfBirth: Date;
}
