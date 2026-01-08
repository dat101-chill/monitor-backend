import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Website } from '../websites/website.entity';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';
import { MailService } from '../mail/mail.service';
import { buildMonitorReport } from './monitor-report';

@Injectable()
export class MonitorService {
  private readonly logger = new Logger(MonitorService.name);

  constructor(
    @InjectRepository(Website)
    private readonly websiteRepo: Repository<Website>,
    private readonly mailService: MailService,
  ) {}
  @Cron('*/1 * * * *') 
  async checkWebsites(url: string) {
    this.logger.log('Running website monitor job...');
    const websites = await this.websiteRepo.find();

    for (const site of websites) {
      try {
        const start = Date.now();

        const response = await axios.get(site.url, {
          timeout: 5000,
          validateStatus: () => true,
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          },
        });

        site.responseTime = Date.now() - start;
        site.status =
          response.status >= 200 && response.status < 400
            ? 'ONLINE'
            : 'OFFLINE';

        site.lastCheckedAt = new Date();

        await this.websiteRepo.save(site);

        this.logger.log(
          `${site.url} ${site.status} (${response.status}, ${site.responseTime}ms)`,
        );
      } catch (error) {
        site.status = 'OFFLINE';
        site.lastCheckedAt = new Date();
        site.responseTime = null;

        await this.websiteRepo.save(site);

        this.logger.warn(`${site.url} OFFLINE (timeout/network error)`);
        return { message: `Checked ${site.url}` };
      }
    }
  }

  async sendReportEmail(to: string) {
    const websites = await this.websiteRepo.find();
    const html = buildMonitorReport(websites);

    await this.mailService.send(
      to,
      ' Báo cáo monitor website',
      html,
    );

    this.logger.log(`Monitor report sent to ${to}`);
  }
  
}
