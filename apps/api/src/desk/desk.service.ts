import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Desk } from '../typeorm/entities/Desk';

@Injectable()
export class DeskService {
  constructor(
    @InjectRepository(Desk) private deskRepository: Repository<Desk>,
  ) {}

  async create(
    name: string,
    description: string,
    order: number,
  ): Promise<Desk> {
    const newDesk = this.deskRepository.create({
      name,
      description,
      order,
      createdAt: new Date(),
    });
    return this.deskRepository.save(newDesk);
  }

  async remove(id: number): Promise<boolean> {
    const result: DeleteResult = await this.deskRepository.delete(id);
    return result.affected > 0;
  }

  async findAll(): Promise<Desk[]> {
    return await this.deskRepository.find({
      order: {
        order: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Desk> {
    return await this.deskRepository.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<Desk> {
    return await this.deskRepository.findOne({
      where: { name },
    });
  }
}
