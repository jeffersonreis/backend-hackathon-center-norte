import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class States {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  value: string;

  @Column({ length: 50 })
  label: string;
}
