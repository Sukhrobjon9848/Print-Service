import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot((process.env.DB)), ConfigModule.forRoot({
    isGlobal: true,
  })],

})
export class AppModule { }
