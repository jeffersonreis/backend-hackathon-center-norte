import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { StoresModule } from './stores/stores.module';
import { WalletsModule } from './wallets/wallets.module';
import { TrackingModule } from './tracking/tracking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportModule } from './export/export.module';
import * as dotenv from 'dotenv';
import { ShoppingModule } from './shopping/shopping.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },    
      autoLoadEntities: true,
      synchronize: true,
    }),
    CustomersModule,
    StoresModule,
    TrackingModule,
    WalletsModule,
    ExportModule,
    ShoppingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
