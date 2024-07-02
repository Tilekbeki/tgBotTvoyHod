import { Module } from '@nestjs/common';
import { HelpReqService } from './help-req.service';
import { HelpReqController } from './help-req.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [HelpReqController],
  providers: [HelpReqService,PrismaService],
})
export class HelpReqModule {}
