import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponsibleModule } from './responsible/responsible.module';
import { WebsitesModule } from './websites/website.module';
import { MonitorModule } from './monitor/monitor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'website_monitor',
      autoLoadEntities: true,
      synchronize: false,
    }),
    ResponsibleModule,
    WebsitesModule,
    MonitorModule, 
  ],
})
export class AppModule {}
