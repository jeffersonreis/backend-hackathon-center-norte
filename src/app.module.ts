import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { StatesModule } from './states/states.module';
import { StoresModule } from './stores/stores.module';
import { WalletsModule } from './wallets/wallets.module';

@Module({
  imports: [CustomersModule, StatesModule, StoresModule, WalletsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
