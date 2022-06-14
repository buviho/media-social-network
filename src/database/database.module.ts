import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../common/services/config.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CommonModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.db.host,
        port: configService.db.port,
        username: configService.db.user,
        password: configService.db.pass,
        database: configService.db.name,
        entities: [__dirname + '/**/models/*.entity{.ts,.js}'],
        //logging: true,
        synchronize: false,
        migrationsRun: true,
        migrations: [
          __dirname + '/**/migrations/*{.ts,.js}',
          __dirname + '/**/seedings/*{.ts,.js}',
        ],
        cli: {
          migrationsDir: 'src/database/migrations',
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
