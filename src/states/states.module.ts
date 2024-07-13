import { Module } from '@nestjs/common';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { States } from './states.entity';

@Module({
  imports: [TypeOrmModule.forFeature([States])],
  controllers: [StatesController],
  providers: [StatesService]
})
export class StatesModule {}
