import { Module } from '@nestjs/common';
import { DeskService } from './desk.service';
import { DeskResolver } from './desk.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Desk} from '../typeorm/entities/Desk';

@Module({
  imports: [TypeOrmModule.forFeature([Desk])],
  providers: [DeskService, DeskResolver],
})
export class DeskModule {}
