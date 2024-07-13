import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShoppingDto } from './dto/create-shopping.dto';
import { UpdateShoppingDto } from './dto/update-shopping.dto';
import { Shopping } from './shopping.entity';

@Injectable()
export class ShoppingService {
  constructor(
    @InjectRepository(Shopping)
    private readonly shoppingRepository: Repository<Shopping>,
  ) {}

  async create(createShoppingDto: CreateShoppingDto): Promise<Shopping> {
    const existingShopping = await this.shoppingRepository.findOne({
      where: { id: createShoppingDto.id },
    });
    if (existingShopping) {
      throw new BadRequestException(`Shopping with ID ${createShoppingDto.id} already exists.`);
    }
    const shopping = this.shoppingRepository.create(createShoppingDto);
    return this.shoppingRepository.save(shopping);
  }

  findAll(): Promise<Shopping[]> {
    return this.shoppingRepository.find();
  }

  async findOne(id: number): Promise<Shopping> {
    const shopping = await this.shoppingRepository.findOne({ where: { id } });
    if (!shopping) {
      throw new NotFoundException(`Shopping with ID ${id} not found.`);
    }
    return shopping;
  }

  async update(id: number, updateShoppingDto: UpdateShoppingDto): Promise<Shopping> {
    const shopping = await this.shoppingRepository.preload({
      id,
      ...updateShoppingDto,
    });
    if (!shopping) {
      throw new NotFoundException(`Shopping with ID ${id} not found.`);
    }
    return this.shoppingRepository.save(shopping);
  }

  async remove(id: number): Promise<void> {
    const shopping = await this.findOne(id);
    await this.shoppingRepository.remove(shopping);
  }
}
