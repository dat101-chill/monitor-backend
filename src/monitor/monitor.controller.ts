import { Controller, Get, Query } from '@nestjs/common';
import { MonitorService } from './monitor.service';

@Controller('monitor')
export class MonitorController {
  constructor(
    private readonly monitorService: MonitorService,
  ) {}

  @Get('check')
  async check(@Query('url') url: string) {
    return this.monitorService.checkWebsites(url);
  }
}
