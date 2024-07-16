import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { CreateProgressinfoDto } from './dto/create-progressinfo.dto';
import { UpdateProgressinfoDto } from './dto/update-progressinfo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressinfoService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(progressinfoData: CreateProgressinfoDto) {
    const { dateChecked, admin, goalId, status, comment } = progressinfoData;
    // Provide default values or use provided ones if available
    const defaultDateChecked = dateChecked || new Date().toISOString(); // Use current date/time if not provided
    const defaultAdmin = admin || ""; // Empty string if not provided
    const defaultStatus = status || "active"; // "active" if not provided
    const defaultComment = comment || ""; // Empty string if not provided

    return this.prismaService.progressInfo.create({
      data: {
        dateChecked: defaultDateChecked,
        admin: defaultAdmin,
        goalId: goalId || 17, // Default goalId or provided one
        status: defaultStatus,
        comment: defaultComment,
      }
    });
  }

  async findAll() {
    const progressInfos = await this.prismaService.progressInfo.findMany({
      include: {
        result: {
          include: {
            progressInfo: true,
          },
        },
        goal: {
          include: {
            userGoals: {
              include: {
                user: true
              }
            }
          }}
        }
      });

    let proginf = progressInfos.map(progressInfo => ({
      id: progressInfo.id,
      dateChecked: progressInfo.dateChecked,
      admin: progressInfo.admin,
      goalId: progressInfo.goalId,
      goalName: progressInfo.goal.name,
      goalDescr: progressInfo.goal.description,
      goalDeadline: progressInfo.goal.deadline,
      userName: progressInfo.goal.userGoals[0].user.name,
      userId: progressInfo.goal.userGoals[0].user.chatId,
      status: progressInfo.status,
      comment: progressInfo.comment,
      results: progressInfo.result
    }));



    return proginf;
  }

  async findOne(id: number): Promise<any> {
    const progressInfo = await this.prismaService.progressInfo.findUnique({
      where: { id },
      include: {
        result: {
          include: {
            progressInfo: true,
          },
        },
        goal: {
          include: {
            userGoals: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });
  
    if (!progressInfo) {
      throw new HttpException('progressInfo not found', HttpStatus.NOT_FOUND);
    }
  
    // Преобразование структуры progressInfo для вывода
    let processedProgressInfo = {
      id: progressInfo.id,
      dateChecked: progressInfo.dateChecked,
      admin: progressInfo.admin,
      goalId: progressInfo.goalId,
      goalName: progressInfo.goal.name,
      goalDescr: progressInfo.goal.description,
      goalDeadline: progressInfo.goal.deadline,
      userName: progressInfo.goal.userGoals[0].user.name,
      userId: progressInfo.goal.userGoals[0].user.chatId,
      status: progressInfo.status,
      comment: progressInfo.comment,
      results: progressInfo.result
    };
  
    return processedProgressInfo;
  }

  async update(id: number, updateProgressinfoDto: UpdateProgressinfoDto) {
    const progressInfo = await this.prismaService.progressInfo.update({
      where: { id },
      data: updateProgressinfoDto,
    });
    return progressInfo;
  }

  async remove(goalId: number) {
    const deletedprogressInfo = await this.prismaService.progressInfo.deleteMany({
      where: { goalId },
    });
    return deletedprogressInfo;
  }
}
