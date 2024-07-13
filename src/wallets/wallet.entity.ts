import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  storeId: string;

  @Column()
  customerId: string;

  @Column({ type: 'date' })
  date: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  balance: number;
}
