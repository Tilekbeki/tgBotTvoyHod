import { Module } from '@nestjs/common';
import { UserPrizesService } from './user-prizes.service';
import { UserPrizesController } from './user-prizes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserPrizesController],
  providers: [UserPrizesService,PrismaService],
})
export class UserPrizesModule {}
