import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class TrackingService {
  private trackingData = [];

  constructor(private readonly customersService: CustomersService) {}

  async create(createTrackingDto: CreateTrackingDto) {
    const userExists = await this.customersService.findOne(createTrackingDto.userId);
    if (!userExists) {
      throw new BadRequestException(`User with ID ${createTrackingDto.userId} does not exist.`);
    }

    const existingTracking = this.trackingData.find(
      tracking =>
        tracking.userId === createTrackingDto.userId &&
        tracking.latitude === createTrackingDto.latitude &&
        tracking.longitude === createTrackingDto.longitude,
    );
    if (existingTracking) {
      throw new BadRequestException(
        `Tracking data for user ${createTrackingDto.userId} at the given location already exists.`,
      );
    }
    this.trackingData.push(createTrackingDto);
    return 'Tracking data created';
  }

  findAll() {
    return this.trackingData;
  }

  findOne(userId: number) {
    const tracking = this.trackingData.find(tracking => tracking.userId === userId);
    if (!tracking) {
      throw new NotFoundException(`Tracking data for user ${userId} not found.`);
    }
    return tracking;
  }

  async update(userId: number, updateTrackingDto: UpdateTrackingDto) {
    const userExists = await this.customersService.findOne(userId);
    if (!userExists) {
      throw new BadRequestException(`User with ID ${userId} does not exist.`);
    }

    const trackingIndex = this.trackingData.findIndex(tracking => tracking.userId === userId);
    if (trackingIndex === -1) {
      throw new NotFoundException(`Tracking data for user ${userId} not found.`);
    }
    const existingTracking = this.trackingData[trackingIndex];
    this.trackingData[trackingIndex] = { ...existingTracking, ...updateTrackingDto };
    return `Tracking data for user ${userId} updated`;
  }

  remove(userId: number) {
    const trackingIndex = this.trackingData.findIndex(tracking => tracking.userId === userId);
    if (trackingIndex === -1) {
      throw new NotFoundException(`Tracking data for user ${userId} not found.`);
    }
    this.trackingData.splice(trackingIndex, 1);
    return `Tracking data for user ${userId} removed`;
  }
}
