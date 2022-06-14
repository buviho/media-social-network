import { Injectable } from '@nestjs/common';
import { ApiError } from '../common/classes/api-error';
import { Repository } from 'typeorm';
import { User } from '../database/models/user.entity';
import { RegisterDto } from './dtos/register.dto';
import { ErrorCode } from '../common/constants/errors';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '../common/services/config.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async register(data: RegisterDto) {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (user) {
      throw new ApiError(ErrorCode.USER_IS_EXIST);
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const newUser = {
      email: data.email,
      password: passwordHash,
      name: data.name,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
    };

    const result = await this.userRepository.create(newUser);
    await this.userRepository.save(result);

    const token = await this._createAccessToken({
      id: result.id,
      email: result.email,
    });

    return { newUser: result, token: token };
  }

  async login(data: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new ApiError(ErrorCode.INVALID_EMAIL);
    }

    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    if (!isPasswordMatch) {
      throw new ApiError(ErrorCode.INVALID_PASSWORD);
    }

    const token = await this._createAccessToken({
      id: user.id,
      email: user.email,
    });

    return { id: user.id, email: user.email, token: token };
  }

  async _createAccessToken(user: any) {
    return jwt.sign(user, this.configService.jwt.accessTokenSecret, {
      expiresIn: '5m',
    });
  }
}
