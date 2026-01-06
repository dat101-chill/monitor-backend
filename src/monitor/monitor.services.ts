import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Website } from '../websites/website.entity';
import axios from 'axios';
import * as cron from 'node-cron';

@Injectable()
export class MonitorService implements OnModuleInit {
  constructor(
    @InjectRepository(Website)
    private readonly websiteRepo: Repository<Website>,
  ) {}

  onModuleInit() {
    this.startMonitoring();
  }

  startMonitoring() {
    cron.schedule('*/5 * * * *', async () => {
      console.log('🔍 Checking websites...');

      const websites = await this.websiteRepo.find();

      for (const site of websites) {
        try {
          await axios.get(site.url, { timeout: 5000 });
          site.isOnline = true;
          console.log(` ONLINE: ${site.name}`);
        } catch (error) {
          site.isOnline = false;
          console.log(` OFFLINE: ${site.name}`);
        }

        site.lastCheck = new Date();
        await this.websiteRepo.save(site);
      }
    });
  }

  async checkWebsite(url: string) {
    const start = Date.now();

    try {
      const res = await axios.get(url, { timeout: 5000 });
      return {
        url,
        status: res.status,
        isOnline: true,
        responseTime: Date.now() - start,
        checkedAt: new Date(),
      };
    } catch (error) {
      return {
        url,
        status: null,
        isOnline: false,
        responseTime: null,
        checkedAt: new Date(),
        error: error.message,
      };
    }
  }
}
