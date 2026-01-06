import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonitorService } from './monitor.services';
import { Website } from '../websites/website.entity';
import { MonitorController} from './monitor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Website])],

  providers: [MonitorService],
  controllers: [MonitorController],
})
export class MonitorModule {}
