import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Responsible } from '../responsible/responsible.entity';

@Entity('website')
export class Website {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ default: true })
  isOnline: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastCheck: Date;

  @ManyToOne(() => Responsible, responsible => responsible.websites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'responsibleId' }) 
  responsible: Responsible;
}
