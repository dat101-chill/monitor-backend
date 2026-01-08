import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Responsible } from '../responsible/responsible.entity';

@Entity('website')
export class Website {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Responsible, responsible => responsible.websites, {
    onDelete: 'CASCADE',
  })

  @JoinColumn({ name: 'responsibleid' })
  responsible?: Responsible;

  @Column({ name: 'responsibleid', nullable: true })
  responsibleId: number | null;

  @Column({ name: 'isonline', default: true })
  isonline: boolean;

  @Column({ name: 'lastcheck', type: 'timestamp', nullable: true })
  lastCheck: Date;

  @Column({ length: 20, nullable: true })
  status: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ name: 'responsetime', type: 'int', nullable: true })
  responseTime: number| null;

  @Column({ type: 'timestamp', nullable: true })
  lastCheckedAt: Date;

}
