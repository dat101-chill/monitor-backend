import { Controller, Get, Query } from '@nestjs/common';
import { MonitorService } from './monitor.services';

@Controller('monitor')
export class MonitorController {
  constructor(
    private readonly monitorService: MonitorService,
  ) {}

  @Get('check')
  async check(@Query('url') url: string) {
    return this.monitorService.checkWebsite(url);
  }
}
