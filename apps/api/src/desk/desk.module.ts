import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeskService } from './desk.service';
import { DeskResolver } from './desk.resolver';
import { AbilityModule } from './../ability/ability.module';
import { Desk } from '../typeorm/entities/Desk';

@Module({
  imports: [TypeOrmModule.forFeature([Desk]), AbilityModule],
  providers: [DeskService, DeskResolver],
  exports: [DeskService],
})
export class DeskModule {}
