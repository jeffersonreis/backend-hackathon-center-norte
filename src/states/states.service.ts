import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Injectable()
export class StatesService {
  private states = []; // Substituir por uma conexão de banco de dados real

  create(createStateDto: CreateStateDto) {
    const existingState = this.states.find(state => state.value === createStateDto.value);
    if (existingState) {
      throw new BadRequestException(`State with value ${createStateDto.value} already exists.`);
    }
    this.states.push(createStateDto);
    return 'State created';
  }

  findAll() {
    return this.states;
  }

  findOne(value: string) {
    const state = this.states.find(state => state.value === value);
    if (!state) {
      throw new NotFoundException(`State with value ${value} not found.`);
    }
    return state;
  }

  update(value: string, updateStateDto: UpdateStateDto) {
    const stateIndex = this.states.findIndex(state => state.value === value);
    if (stateIndex === -1) {
      throw new NotFoundException(`State with value ${value} not found.`);
    }
    const existingState = this.states[stateIndex];
    this.states[stateIndex] = { ...existingState, ...updateStateDto };
    return `State ${value} updated`;
  }

  remove(value: string) {
    const stateIndex = this.states.findIndex(state => state.value === value);
    if (stateIndex === -1) {
      throw new NotFoundException(`State with value ${value} not found.`);
    }
    this.states.splice(stateIndex, 1);
    return `State ${value} removed`;
  }
}
