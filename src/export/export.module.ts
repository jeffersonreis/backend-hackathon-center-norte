import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportService } from './export.service';
import { Customer } from 'src/customers/customer.entity';
import { Store } from 'src/stores/stores.entity';
import { Wallet } from 'src/wallets/wallet.entity';
import { Tracking } from 'src/tracking/tracking.entity';
import { ExportController } from './export.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, Store, Tracking, Wallet]),
  ],
  providers: [ExportService],
  controllers: [ExportController],
  exports: [ExportService],
})
export class ExportModule {}
