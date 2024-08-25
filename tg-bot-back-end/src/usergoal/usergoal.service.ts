import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUsergoalDto } from './dto/create-usergoal.dto';
import { UpdateUsergoalDto } from './dto/update-usergoal.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Progressinfo } from 'src/progressinfo/entities/progressinfo.entity';

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
        user: true,
        goal:  {
          include: {
            progressInfo: {
              include: {
                goal: true
              }
            }
          }
        },
      },
    });
  
    // Преобразовать данные в нужный формат, если это необходимо
    const formattedUserGoals = userGoals.map(({ user, goal, ...rest }) => ({
      user: user.name, // Предполагается, что в объекте user есть поле name
      goal: goal.name, // Предполагается, что в объекте goal есть поле name
      userId: user.chatId,
      goalId: goal.id,
      status: goal.progressInfo[0].status,
      ...rest, // Остальные поля из userGoals
    }));
    console.log(formattedUserGoals)
  
    return formattedUserGoals;
  }

  async findOne(userId: number) {
    const userGoals = await this.prismaService.userGoals.findMany({
      where: {userId},
      include: {
        user: true,
        goal:  {
          include: {
            progressInfo: {
              include: {
                goal: true
              }
            }
          }
        },
      },
    });
   
    const formattedUserGoals = userGoals.map(({ user, goal, ...rest }) => ({
      user: user.name, // Предполагается, что в объекте user есть поле name
      goal: goal.name, // Предполагается, что в объекте goal есть поле name
      userId: user.chatId,
      goalId: goal.id,
      status: goal.progressInfo[0].status,
      ...rest, // Остальные поля из userGoals
    }));
    console.log(formattedUserGoals)
  
    return formattedUserGoals;
    
  }

  async update(id: number, updateUsergoalDto: UpdateUsergoalDto) {
    return `This action updates a #${id} usergoal`;
  }

  async remove(goalId: number) {
    const deletedUserGoal = await this.prismaService.userGoals.deleteMany({
      where: { goalId },
    });
    return deletedUserGoal;
  }
}
