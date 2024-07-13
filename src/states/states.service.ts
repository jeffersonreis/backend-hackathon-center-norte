import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { States } from './states.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(States)
    private readonly stateRepository: Repository<States>,
  ) {}

  async create(createStateDto: CreateStateDto): Promise<States> {
    const existingState = await this.stateRepository.findOne({
      where: { value: createStateDto.value },
    });
    if (existingState) {
      throw new BadRequestException(`States with value ${createStateDto.value} already exists.`);
    }
    const state = this.stateRepository.create(createStateDto);
    return this.stateRepository.save(state);
  }

  findAll(): Promise<States[]> {
    return this.stateRepository.find();
  }

  async findOne(value: string): Promise<States> {
    const state = await this.stateRepository.findOne({
      where: { value },
    });
    if (!state) {
      throw new NotFoundException(`States with value ${value} not found.`);
    }
    return state;
  }

  async update(value: string, updateStateDto: UpdateStateDto): Promise<States> {
    const state = await this.stateRepository.findOne({
      where: { value },
    });
    if (!state) {
      throw new NotFoundException(`States with value ${value} not found.`);
    }
    Object.assign(state, updateStateDto);
    return this.stateRepository.save(state);
  }

  async remove(value: string): Promise<void> {
    const state = await this.findOne(value);
    await this.stateRepository.remove(state);
  }
}
