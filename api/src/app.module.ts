import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ApisModule } from './apis/apis.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { ApiChangesModule } from './api-changes/api-changes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ApisModule,
    SchedulingModule,
    ApiChangesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
