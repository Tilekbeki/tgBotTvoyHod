import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ResultService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createResultDto: CreateResultDto) {
    const newResult = await this.prismaService.result.create({
      data: createResultDto,
    });
    return newResult;
  }

  findAll() {
    return this.prismaService.result.findMany();
  }

  async findOne(id: number) {
    const result = await this.prismaService.result.findUnique({
      where: { id },
    });
    if (!result) {
      throw new HttpException('result not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
    const result = await this.prismaService.result.update({
      where: { id },
      data: updateResultDto,
    });
    return result;
  }

  async remove(id: number) {
    const deletedResult = await this.prismaService.result.delete({
      where: { id },
    });
    return deletedResult;
  }
}
