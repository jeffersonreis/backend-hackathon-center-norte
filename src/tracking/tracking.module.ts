import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { CustomersModule } from '../customers/customers.module';
import { Tracking } from './tracking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tracking]), CustomersModule],
  controllers: [TrackingController],
  providers: [TrackingService],
})
export class TrackingModule {}
