import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  primaryKey: number; 
  
  @Column()
  id: number;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column('text')
  address: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  state: string;

  @Column({ length: 10 })
  zipCode: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @Column({ type: 'timestamp' })
  registrationDate: string;

  @Column('simple-array')
  preferences: string[];
}
