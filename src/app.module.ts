import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { StatesModule } from './states/states.module';
import { StoresModule } from './stores/stores.module';
import { WalletsModule } from './wallets/wallets.module';
import { TrackingModule } from './tracking/tracking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportController } from './export/export.controller';
import { ExportModule } from './export/export.module';

const dbConfig = require("../ormconfig.json"); 
@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), CustomersModule, StatesModule, StoresModule, WalletsModule, TrackingModule, ExportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
