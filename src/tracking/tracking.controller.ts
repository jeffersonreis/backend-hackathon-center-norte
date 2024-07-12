import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackingDto: CreateTrackingDto) {
    return this.trackingService.create(createTrackingDto);
  }

  @Get()
  findAll() {
    return this.trackingService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: number) {
    return this.trackingService.findOne(userId);
  }

  @Patch(':userId')
  update(@Param('userId') userId: number, @Body() updateTrackingDto: UpdateTrackingDto) {
    return this.trackingService.update(userId, updateTrackingDto);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('userId') userId: number) {
    return this.trackingService.remove(userId);
  }
}
