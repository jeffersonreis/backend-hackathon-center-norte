import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const existingWallet = await this.walletRepository.findOne({
      where: { customerId: createWalletDto.customerId },
    });
    if (existingWallet) {
      throw new BadRequestException(`Wallet for customer ID ${createWalletDto.customerId} already exists.`);
    }
    const wallet = this.walletRepository.create(createWalletDto);
    return this.walletRepository.save(wallet);
  }

  findAll(): Promise<Wallet[]> {
    return this.walletRepository.find();
  }

  async findOne(customerId: string): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({
      where: { customerId },
    });
    if (!wallet) {
      throw new NotFoundException(`Wallet for customer ID ${customerId} not found.`);
    }
    return wallet;
  }

  async update(customerId: number, updateWalletDto: UpdateWalletDto): Promise<Wallet> {
    const wallet = await this.walletRepository.preload({
      id: customerId,  // Assumindo que `customerId` é a chave primária.
      ...updateWalletDto,
    });
    if (!wallet) {
      throw new NotFoundException(`Wallet for customer ID ${customerId} not found.`);
    }
    return this.walletRepository.save(wallet);
  }

  async remove(customerId: string): Promise<void> {
    const wallet = await this.findOne(customerId);
    await this.walletRepository.remove(wallet);
  }
}
