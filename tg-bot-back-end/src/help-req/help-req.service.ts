import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHelpReqDto } from './dto/create-help-req.dto';
import { UpdateHelpReqDto } from './dto/update-help-req.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HelpReqService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createHelpReqDto: CreateHelpReqDto) {
    const newHelpReq = await this.prismaService.helpReq.create({
      data: createHelpReqDto,
    });
    return newHelpReq;
  }

  findAll() {
    return this.prismaService.helpReq.findMany();
  }

  async findOne(id: number) {
    const helpReq = await this.prismaService.helpReq.findUnique({
      where: { id },
    });
    if (!helpReq) {
      throw new HttpException('HelpReq not found', HttpStatus.NOT_FOUND);
    }
    return helpReq;
  }

  async update(id: number, updateHelpReqDto: UpdateHelpReqDto) {
    const helpReq = await this.prismaService.helpReq.update({
      where: { id },
      data: updateHelpReqDto,
    });
    return helpReq;
  }

  async remove(id: number) {
    const deletedHelpReq = await this.prismaService.helpReq.delete({
      where: { id },
    });
    return deletedHelpReq;
  }
}
