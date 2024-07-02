import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userData: CreateUserDto) {
    const newUser = await this.prismaService.user.create({
      data: userData,
    });
    return newUser;
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(chatId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { chatId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(chatId: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.prismaService.user.update({
      where: { chatId },
      data: updateUserDto,
    });
    return updatedUser;
  }

  async remove(chatId: number) {
    const deletedUser = await this.prismaService.user.delete({
      where: { chatId },
    });
    return deletedUser;
  }
}
