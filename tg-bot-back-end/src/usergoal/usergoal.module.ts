import { Module } from '@nestjs/common';
import { UsergoalService } from './usergoal.service';
import { UsergoalController } from './usergoal.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsergoalController],
  providers: [UsergoalService, PrismaService],
})
export class UsergoalModule {}
