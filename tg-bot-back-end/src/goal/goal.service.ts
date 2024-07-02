import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GoalService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createGoalDto: CreateGoalDto) {
    const { name, description, deadline, categoryName } = createGoalDto;

    return this.prismaService.goal.create({
      data: {
        name,
        description,
        deadline,
        categoryName,
      },
    });
  }

  findAll() {
    return this.prismaService.goal.findMany();
  }

  async findOne(id: number) {
    const goal = await this.prismaService.goal.findUnique({
      where: { id },
    });
    if (!goal) {
      throw new HttpException('Goal not found', HttpStatus.NOT_FOUND);
    }
    return goal;
  }

  async update(id: number, updateGoalDto: UpdateGoalDto) {
    const updatedGoal = await this.prismaService.goal.update({
      where: { id },
      data: updateGoalDto,
    });
    return updatedGoal;
  }

  async remove(id: number) {
    const deletedGoal = await this.prismaService.goal.delete({
      where: { id },
    });
    return deletedGoal;
  }
}
