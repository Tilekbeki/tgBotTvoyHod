import { Module } from '@nestjs/common';
import { PrizeService } from './prize.service';
import { PrizeController } from './prize.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PrizeController],
  providers: [PrizeService,PrismaService],
})
export class PrizeModule {}
