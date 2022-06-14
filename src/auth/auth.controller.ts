import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { ApiResult } from '../common/classes/api-result';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authservice: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ description: 'Register a new account' })
  async register(@Body() body: RegisterDto) {
    const dataResponse = await this.authservice.register(body);
    return new ApiResult().success(dataResponse);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ description: 'Register a new account' })
  async login(@Body() body: LoginDto) {
    const dataResponse = await this.authservice.login(body);
    return new ApiResult().success(dataResponse);
  }
}
