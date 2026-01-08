import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Responsible } from '../responsible/responsible.entity';

@Entity('website')
export class Website {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Responsible, responsible => responsible.websites, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'responsibleId' })
  responsible: Responsible;

  @Column()
  name: string;

  @Column()
  url: string;
  
  @Column({ default: true })
  isonline: boolean;

  @Column({ default: 'UNKNOWN' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  lastCheckedAt: Date;

  @Column({ type: 'int', nullable: true })
  responseTime: number | null;
}
