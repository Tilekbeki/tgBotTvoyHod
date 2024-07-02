import { Module } from '@nestjs/common';
import { ProgressinfoService } from './progressinfo.service';
import { ProgressinfoController } from './progressinfo.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProgressinfoController],
  providers: [ProgressinfoService,PrismaService],
})
export class ProgressinfoModule {}
