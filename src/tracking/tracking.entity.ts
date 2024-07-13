import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tracking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column('decimal', { precision: 10, scale: 6 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  longitude: number;

  @Column({ nullable: true })
  storeId?: number;

  @Column('json')
  deviceInfo: {
    device_type: string;
    os_version: string;
    app_version: string;
  };
}
