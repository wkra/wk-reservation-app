import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Desk } from '../typeorm/entities/Desk';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class DeskService {
  constructor(
    @InjectRepository(Desk) private deskRepository: Repository<Desk>,
  ) {}

  async createDesk(
    name: string,
    description: string,
    order: number,
  ): Promise<Desk> {
    const deskExist = await this.deskRepository.findOneBy({ name });

    if (deskExist) {
      throw new BadRequestException('Desk with same name exist.');
    }

    const newDesk = await this.deskRepository.create({
      name,
      description,
      order,
      createdAt: new Date(),
    });
    return this.deskRepository.save(newDesk);
  }

  async removeDesk(id: number): Promise<boolean> {
    const result: DeleteResult = await this.deskRepository.delete(id);
    return result.affected > 0;
  }

  async getDesks(): Promise<Desk[]> {
    return await this.deskRepository.find({
      order: {
        order: 'ASC',
      },
    });
  }
}
