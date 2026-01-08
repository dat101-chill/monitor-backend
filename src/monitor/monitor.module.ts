import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from '../websites/website.entity';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { TestMailController } from './test-mail.controller';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([Website])],
  controllers: [
    MonitorController,
    TestMailController, 
  ],
  providers: [MonitorService, MailService],
})
export class MonitorModule {}
