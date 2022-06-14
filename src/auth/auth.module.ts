import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/models/user.entity';
import { AuthenticationController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthenticationController],
  providers: [AuthService],
})
export class AuthModule {}
