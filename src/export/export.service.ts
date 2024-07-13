// src/export/export.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createObjectCsvWriter } from 'csv-writer';
import * as path from 'path';
import { Customer } from 'src/customers/customer.entity';
import { Store } from 'src/stores/stores.entity';
import { Tracking } from 'src/tracking/tracking.entity';
import { Wallet } from 'src/wallets/wallet.entity';

@Injectable()
export class ExportService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Store)
    private readonly storeRepository: Repository<Store>,
    @InjectRepository(Tracking)
    private readonly trackingRepository: Repository<Tracking>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async exportCustomersToCSV(): Promise<string> {
    const customers = await this.customerRepository.find();
    const csvPath = path.join(__dirname, '../../exports/customers.csv');

    const csvWriter = createObjectCsvWriter({
      path: csvPath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'firstName', title: 'First Name' },
        { id: 'lastName', title: 'Last Name' },
        { id: 'address', title: 'Address' },
        { id: 'city', title: 'City' },
        { id: 'state', title: 'State' },
        { id: 'zipCode', title: 'Zip Code' },
        { id: 'phone', title: 'Phone' },
        { id: 'email', title: 'Email' },
        { id: 'dateOfBirth', title: 'Date of Birth' },
        { id: 'registrationDate', title: 'Registration Date' },
        { id: 'preferences', title: 'Preferences' },
      ],
    });

    await csvWriter.writeRecords(customers);
    return csvPath;
  }

  async exportStoresToCSV(): Promise<string> {
    const stores = await this.storeRepository.find();
    const csvPath = path.join(__dirname, '../../exports/stores.csv');

    const csvWriter = createObjectCsvWriter({
      path: csvPath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'address', title: 'Address' },
        { id: 'city', title: 'City' },
        { id: 'state', title: 'State' },
        { id: 'zipCode', title: 'Zip Code' },
        { id: 'phone', title: 'Phone' },
      ],
    });

    await csvWriter.writeRecords(stores);
    return csvPath;
  }

  async exportTrackingToCSV(): Promise<string> {
    const trackingData = await this.trackingRepository.find();
    const csvPath = path.join(__dirname, '../../exports/tracking.csv');

    const csvWriter = createObjectCsvWriter({
      path: csvPath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'userId', title: 'User ID' },
        { id: 'latitude', title: 'Latitude' },
        { id: 'longitude', title: 'Longitude' },
        { id: 'storeId', title: 'Store ID' },
        { id: 'device_type', title: 'Device Type' },
        { id: 'os_version', title: 'Device OS Version' },
        { id: 'app_version', title: 'Device App Version' },
      ],
    });

    const records = trackingData.map(item => ({
      id: item.id,
      userId: item.userId,
      latitude: item.latitude,
      longitude: item.longitude,
      storeId: item.storeId || '',
      device_type: item.deviceInfo.device_type,
      os_version: item.deviceInfo.os_version,
      app_version: item.deviceInfo.app_version,
    }));

    await csvWriter.writeRecords(records);
    return csvPath;
  }

  async exportWalletsToCSV(): Promise<string> {
    const wallets = await this.walletRepository.find();
    const csvPath = path.join(__dirname, '../../exports/wallets.csv');

    const csvWriter = createObjectCsvWriter({
      path: csvPath,
      header: [
        { id: 'id', title: 'ID' },
        { id: 'customerId', title: 'Customer ID' },
        { id: 'balance', title: 'Balance' },
        { id: 'storeId', title: 'Store ID' },
        { id: 'date', title: 'Date' },
        { id: 'amount', title: 'Amount' },
        { id: 'type', title: 'Type' },
        { id: 'description', title: 'Description' }
      ],
    });

    await csvWriter.writeRecords(wallets);
    return csvPath;
  }
}
