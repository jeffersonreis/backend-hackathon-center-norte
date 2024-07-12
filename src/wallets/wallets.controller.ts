import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':customerId')
  findOne(@Param('customerId') customerId: string) {
    return this.walletsService.findOne(customerId);
  }

  @Patch(':customerId')
  update(@Param('customerId') customerId: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(customerId, updateWalletDto);
  }

  @Delete(':customerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('customerId') customerId: string) {
    return this.walletsService.remove(customerId);
  }
}
