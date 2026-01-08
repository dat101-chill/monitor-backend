import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { createReadStream } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('file-status')
  getFileStatus(@Res() res) {
    const filePath = join(
      process.cwd(),
      'public',
      'files',
      'status.json',
    );

    res.type('application/json');
    createReadStream(filePath).pipe(res);
  }
}
