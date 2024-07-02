import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class PrizeService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createPrizeDto: CreatePrizeDto) {
    const newPrize = await this.prismaService.prize.create({
      data: createPrizeDto,
    });
    return newPrize;
  }

  findAll() {
    return this.prismaService.prize.findMany();
  }

  async findOne(id: number) {
    const prize = await this.prismaService.prize.findUnique({
      where: { id },
    });
    if (!prize) {
      throw new HttpException('prize not found', HttpStatus.NOT_FOUND);
    }
    return prize;
  }

  async update(id: number, updatePrizeDto: UpdatePrizeDto) {
    const prize = await this.prismaService.prize.update({
      where: { id },
      data: updatePrizeDto,
    });
    return prize;
  }

  async remove(id: number) {
    const deletedPrize = await this.prismaService.prize.delete({
      where: { id },
    });
    return deletedPrize;
  }
}
