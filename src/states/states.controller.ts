import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { StatesService } from './states.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createStateDto: CreateStateDto) {
    return this.statesService.create(createStateDto);
  }

  @Get()
  findAll() {
    return this.statesService.findAll();
  }

  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.statesService.findOne(value);
  }

  @Patch(':value')
  update(@Param('value') value: string, @Body() updateStateDto: UpdateStateDto) {
    return this.statesService.update(value, updateStateDto);
  }

  @Delete(':value')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('value') value: string) {
    return this.statesService.remove(value);
  }
}
