import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  private customers = []; // Substituir por uma conexão de banco de dados real

  create(createCustomerDto: CreateCustomerDto) {
    const existingCustomer = this.customers.find(customer => customer.id === createCustomerDto.id);
    if (existingCustomer) {
      throw new BadRequestException(`Customer with ID ${createCustomerDto.id} already exists.`);
    }
    this.customers.push(createCustomerDto);
    return 'Customer created';
  }

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find(customer => customer.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    return customer;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customerIndex = this.customers.findIndex(customer => customer.id === id);
    if (customerIndex === -1) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    const existingCustomer = this.customers[customerIndex];
    this.customers[customerIndex] = { ...existingCustomer, ...updateCustomerDto };
    return `Customer #${id} updated`;
  }

  remove(id: number) {
    const customerIndex = this.customers.findIndex(customer => customer.id === id);
    if (customerIndex === -1) {
      throw new NotFoundException(`Customer with ID ${id} not found.`);
    }
    this.customers.splice(customerIndex, 1);
    return `Customer #${id} removed`;
  }
}
