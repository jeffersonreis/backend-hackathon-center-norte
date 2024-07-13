import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  shoppingId: number;
  
  @Column({ length: 100 })
  email: string;

  @Column({ length: 100 })
  website: string;

  @Column({ length: 100 })
  openingHours: string;

  @Column({ length: 15 })
  phone: string;
}
