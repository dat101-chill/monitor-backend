import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Responsible } from './responsible.entity';
import { ResponsibleService } from './responsible.services';
import { ResponsibleController } from './responsible.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Responsible]),
  ],
  controllers: [ResponsibleController],
  providers: [ResponsibleService],
  exports: [ResponsibleService],
})
export class ResponsibleModule {}
