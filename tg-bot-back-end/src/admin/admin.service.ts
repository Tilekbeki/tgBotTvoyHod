import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(adminData: CreateAdminDto) {
    const newAdmin = await this.prismaService.admin.create({
      data: adminData,
    });
    return newAdmin;
  }

  findAll() {
    return this.prismaService.admin.findMany();
  }

  async findOne(id: number) {
    const admin = await this.prismaService.admin.findUnique({
      where: { id },
    });
    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const updatedAdmin = await this.prismaService.admin.update({
      where: { id },
      data: updateAdminDto,
    });
    return updatedAdmin;
  }

  async remove(id: number) {
    const deletedAdmin = await this.prismaService.admin.delete({
      where: { id },
    });
    return deletedAdmin;
  }
}
