import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletsService {
  private wallets = []; // Substituir por uma conexão de banco de dados real

  create(createWalletDto: CreateWalletDto) {
    const existingWallet = this.wallets.find(wallet => wallet.customerId === createWalletDto.customerId);
    if (existingWallet) {
      throw new BadRequestException(`Wallet for customer ID ${createWalletDto.customerId} already exists.`);
    }
    this.wallets.push(createWalletDto);
    return 'Wallet created';
  }

  findAll() {
    return this.wallets;
  }

  findOne(customerId: string) {
    const wallet = this.wallets.find(wallet => wallet.customerId === customerId);
    if (!wallet) {
      throw new NotFoundException(`Wallet for customer ID ${customerId} not found.`);
    }
    return wallet;
  }

  update(customerId: string, updateWalletDto: UpdateWalletDto) {
    const walletIndex = this.wallets.findIndex(wallet => wallet.customerId === customerId);
    if (walletIndex === -1) {
      throw new NotFoundException(`Wallet for customer ID ${customerId} not found.`);
    }
    const existingWallet = this.wallets[walletIndex];
    this.wallets[walletIndex] = { ...existingWallet, ...updateWalletDto };
    return `Wallet for customer #${customerId} updated`;
  }

  remove(customerId: string) {
    const walletIndex = this.wallets.findIndex(wallet => wallet.customerId === customerId);
    if (walletIndex === -1) {
      throw new NotFoundException(`Wallet for customer ID ${customerId} not found.`);
    }
    this.wallets.splice(walletIndex, 1);
    return `Wallet for customer #${customerId} removed`;
  }
}
