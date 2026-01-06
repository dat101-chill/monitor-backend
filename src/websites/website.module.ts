import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Website } from './website.entity';
import { WebsitesService } from './website.services';
import { WebsitesController } from './website.controller';
import { Responsible } from '../responsible/responsible.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Website, Responsible])],
  providers: [WebsitesService],
  controllers: [WebsitesController],
})
export class WebsitesModule {}
