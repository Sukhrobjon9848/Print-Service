import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { OrderModule } from 'src/orders/order.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot("mongodb://localhost/ServicePrint"), ConfigModule.forRoot({
    isGlobal: true,
  }), UserModule, OrderModule],

})
export class AppModule { }
