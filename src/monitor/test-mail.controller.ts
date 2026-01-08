import { Controller, Get } from '@nestjs/common';
import { MonitorService } from './monitor.service';

@Controller('monitor')
export class TestMailController {
  constructor(
    private readonly monitorService: MonitorService,
  ) {}

  @Get('test-mail')
  async testMail() {
    await this.monitorService.sendReportEmail('datn66588@gmail.com');
    return 'MAIL SENT';
  }
}
