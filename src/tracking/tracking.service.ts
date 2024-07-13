// src/tracking/tracking.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingDto } from './dto/update-tracking.dto';
import { CustomersService } from '../customers/customers.service';
import { Tracking } from './tracking.entity';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(Tracking)
    private readonly trackingRepository: Repository<Tracking>,
    private readonly customersService: CustomersService,
  ) {}

  async create(createTrackingDto: CreateTrackingDto): Promise<Tracking> {
    const userExists = await this.customersService.findOne(createTrackingDto.userId);
    if (!userExists) {
      throw new BadRequestException(`User with ID ${createTrackingDto.userId} does not exist.`);
    }

    const existingTracking = await this.trackingRepository.findOne({
      where: {
        userId: createTrackingDto.userId,
        latitude: createTrackingDto.latitude,
        longitude: createTrackingDto.longitude,
      },
    });
    if (existingTracking) {
      throw new BadRequestException(
        `Tracking data for user ${createTrackingDto.userId} at the given location already exists.`,
      );
    }
    const tracking = this.trackingRepository.create(createTrackingDto);
    return this.trackingRepository.save(tracking);
  }

  findAll(): Promise<Tracking[]> {
    return this.trackingRepository.find();
  }

  async findOne(userId: number): Promise<Tracking> {
    const tracking = await this.trackingRepository.findOne({
      where: { userId },
    });
    if (!tracking) {
      throw new NotFoundException(`Tracking data for user ${userId} not found.`);
    }
    return tracking;
  }

  async update(userId: number, updateTrackingDto: UpdateTrackingDto): Promise<Tracking> {
    const userExists = await this.customersService.findOne(userId);
    if (!userExists) {
      throw new BadRequestException(`User with ID ${userId} does not exist.`);
    }

    const tracking = await this.trackingRepository.preload({
      userId,
      ...updateTrackingDto,
    });
    if (!tracking) {
      throw new NotFoundException(`Tracking data for user ${userId} not found.`);
    }
    return this.trackingRepository.save(tracking);
  }

  async remove(userId: number): Promise<void> {
    const tracking = await this.findOne(userId);
    await this.trackingRepository.remove(tracking);
  }
}
