import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Responsible } from './responsible.entity';

@Injectable()
export class ResponsibleService {
  constructor(
    @InjectRepository(Responsible)
    private readonly repo: Repository<Responsible>,
  ) {}

  create(data: Partial<Responsible>) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({ relations: ['websites'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['websites'],
    });
  }

  update(id: number, data: Partial<Responsible>) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }
}
