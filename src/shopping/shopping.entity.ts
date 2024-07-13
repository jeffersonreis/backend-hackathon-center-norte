import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shopping {
  @PrimaryGeneratedColumn()
  primaryKey: number; 
  
  @Column()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 100 })
  city: string;

  @Column({ length: 100 })
  state: string;

  @Column({ length: 20 })
  zipCode: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  website: string;

  @Column({ length: 100 })
  openingHours: string;

  @Column({ length: 100 })
  minLat: string;

  @Column({ length: 100 })
  maxLat: string;

  @Column({ length: 100 })
  minLong: string;

  @Column({ length: 100 })
  maxLong: string;
}
