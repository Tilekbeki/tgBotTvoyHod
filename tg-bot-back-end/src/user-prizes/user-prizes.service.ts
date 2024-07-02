import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserPrizeDto } from './dto/create-user-prize.dto';
import { UpdateUserPrizeDto } from './dto/update-user-prize.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserPrizesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserPrizeDto: CreateUserPrizeDto) {
    const newUserPrize = await this.prismaService.userPrizes.create({
      data: createUserPrizeDto,
    });
    return newUserPrize;
  }

  findAll() {
    return this.prismaService.userPrizes.findMany();
  }

  async findOne(goalId: number) {
    const userPrize = await this.prismaService.userPrizes.findFirst({
      where: { goalId },
      include: {
        user: true,
        Prize: true // Включаем связь с призом
      },
    });

    if (!userPrize) {
      throw new HttpException('User prize not found', HttpStatus.NOT_FOUND);
    }

    // Формируем ответ с необходимыми данными
    const response = {
      userId: userPrize.userId,
      userName: userPrize.user.name,
      prizeId: userPrize.prizeId,
      prizeName: userPrize.Prize.content,
      goalId: userPrize.goalId,
      prizeType: userPrize.Prize.type
    };

    return response;
}

  async update(id: number, updateUserPrizeDto: UpdateUserPrizeDto) {
    const userPrize = await this.prismaService.userPrizes.update({
      where: { id },
      data: updateUserPrizeDto,
    });
    return userPrize;
  }

  async remove(id: number) {
    const deletedUserPrize = await this.prismaService.userPrizes.delete({
      where: { id },
    });
    return deletedUserPrize;
  }
}
