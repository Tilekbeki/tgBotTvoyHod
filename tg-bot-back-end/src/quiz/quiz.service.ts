import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class QuizService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createQuizDto: CreateQuizDto) {
    const newQuiz = await this.prismaService.quiz.create({
      data: createQuizDto,
    });
    return newQuiz;
  }

  findAll() {
    return this.prismaService.quiz.findMany();
  }

  async findOne(goalId: number) {
    const quiz = await this.prismaService.quiz.findFirst({
      where: { goalId },
    });
    if (!quiz) {
      throw new HttpException('Quiz not found', HttpStatus.NOT_FOUND);
    }
    return quiz;
  }

  async update(id: number, updateQuizDto: UpdateQuizDto) {
    const quiz = await this.prismaService.quiz.update({
      where: { id },
      data: updateQuizDto,
    });
    return quiz;
  }

  async remove(goalId: number) {
    const deletedQuiz = await this.prismaService.quiz.deleteMany({
      where: { goalId },
    });
    return deletedQuiz;
  }
}
