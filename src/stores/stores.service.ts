import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  private stores = []; // Substituir por uma conexão de banco de dados real

  create(createStoreDto: CreateStoreDto) {
    const existingStore = this.stores.find(store => store.id === createStoreDto.id);
    if (existingStore) {
      throw new BadRequestException(`Store with ID ${createStoreDto.id} already exists.`);
    }
    this.stores.push(createStoreDto);
    return 'Store created';
  }

  findAll() {
    return this.stores;
  }

  findOne(id: number) {
    const store = this.stores.find(store => store.id === id);
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found.`);
    }
    return store;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    const storeIndex = this.stores.findIndex(store => store.id === id);
    if (storeIndex === -1) {
      throw new NotFoundException(`Store with ID ${id} not found.`);
    }
    const existingStore = this.stores[storeIndex];
    this.stores[storeIndex] = { ...existingStore, ...updateStoreDto };
    return `Store #${id} updated`;
  }

  remove(id: number) {
    const storeIndex = this.stores.findIndex(store => store.id === id);
    if (storeIndex === -1) {
      throw new NotFoundException(`Store with ID ${id} not found.`);
    }
    this.stores.splice(storeIndex, 1);
    return `Store #${id} removed`;
  }
}
