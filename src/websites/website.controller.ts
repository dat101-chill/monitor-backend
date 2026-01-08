import { Controller, Get, Post, Body, Param, Put, Delete, Options } from '@nestjs/common';
import { WebsitesService } from './website.services';

@Controller('websites')
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService) {}

   @Options()
  options() {
    return '';
  }

  @Get()
  findAll() {
    return this.websitesService.findAll();
  }

  @Post()
  create(@Body() body: { name: string; url: string }) {
    return this.websitesService.create(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.websitesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.websitesService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.websitesService.delete(+id);
  }
}
