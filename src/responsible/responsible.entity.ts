import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Website } from '../websites/website.entity';

@Entity()
export class Responsible {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => Website, website => website.responsible)
  websites: Website[];
}
