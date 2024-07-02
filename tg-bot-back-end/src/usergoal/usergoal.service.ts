import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsergoalDto } from './dto/create-usergoal.dto';
import { UpdateUsergoalDto } from './dto/update-usergoal.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsergoalService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(usergoalData: CreateUsergoalDto) {
    const newUserGoal = await this.prismaService.userGoals.create({
      data: usergoalData,
    });
    return newUserGoal;
  }

  async findAll(): Promise<any[]> {
    // Выполнить запрос к базе данных для получения данных о целях пользователей
    const userGoals = await this.prismaService.userGoals.findMany({
      include: {
        user: true, // Включить данные о пользователе
        goal: true, // Включить данные о цели
      },
    });
  
    // Преобразовать данные в нужный формат, если это необходимо
    const formattedUserGoals = userGoals.map(({ user, goal, ...rest }) => ({
      user: user.name, // Предполагается, что в объекте user есть поле name
      goal: goal.name, // Предполагается, что в объекте goal есть поле name
      userId: user.chatId,
      goalId: goal.id,
      ...rest, // Остальные поля из userGoals
    }));
  
    return formattedUserGoals;
  }

  findOne(id: number) {
    return `This action returns a #${id} usergoal`;
  }

  async update(id: number, updateUsergoalDto: UpdateUsergoalDto) {
    return `This action updates a #${id} usergoal`;
  }

  async remove(id: number) {
    return `This action removes a #${id} usergoal`;
  }
}
