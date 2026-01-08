import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Website } from './website.entity';
import { Responsible } from '../responsible/responsible.entity';

@Injectable()
export class WebsitesService {
  constructor(
    @InjectRepository(Website)
    private readonly websiteRepo: Repository<Website>,
    @InjectRepository(Responsible)
    private readonly responsibleRepo: Repository<Responsible>,
  ) {}

  async create(data: { name: string; url: string; responsibleId?: number }) {
  const website = this.websiteRepo.create({
    name: data.name,
    url: data.url,
  });

  if (data.responsibleId) {
    const responsible = await this.responsibleRepo.findOne({
      where: { id: data.responsibleId },
    });

    if (!responsible) {
      throw new NotFoundException('Responsible not found');
    }

    website.responsible = responsible;
  }

  return this.websiteRepo.save(website);
}

  findAll() {
    return this.websiteRepo.find({ relations: ['responsible'] });
  }

  findOne(id: number) {
    return this.websiteRepo.findOne({
      where: { id },
      relations: ['responsible'],
    });
  }

  update(id: number, data: Partial<Website>) {
    return this.websiteRepo.update(id, data);
  }

  delete(id: number) {
    return this.websiteRepo.delete(id);
  }
}
