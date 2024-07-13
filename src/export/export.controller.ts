// src/export/export.controller.ts
import { Controller, Get, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { ExportService } from './export.service';
import { Response } from 'express';

@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Get('customers')
  @HttpCode(HttpStatus.OK)
  async exportCustomers(@Res() res: Response) {
    const csvPath = await this.exportService.exportCustomersToCSV();
    res.download(csvPath);
  }

  @Get('stores')
  @HttpCode(HttpStatus.OK)
  async exportStores(@Res() res: Response) {
    const csvPath = await this.exportService.exportStoresToCSV();
    res.download(csvPath);
  }

  @Get('tracking')
  @HttpCode(HttpStatus.OK)
  async exportTracking(@Res() res: Response) {
    const csvPath = await this.exportService.exportTrackingToCSV();
    res.download(csvPath);
  }

  @Get('wallets')
  @HttpCode(HttpStatus.OK)
  async exportWallets(@Res() res: Response) {
    const csvPath = await this.exportService.exportWalletsToCSV();
    res.download(csvPath);
  }

  // @Get('shopping')
  // @HttpCode(HttpStatus.OK)
  // async exportShopping(@Res() res: Response) {
  //   const csvPath = await this.exportService.exportShoppingToCSV();
  //   res.download(csvPath);
  // }
}
