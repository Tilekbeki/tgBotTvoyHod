import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(categoryData: CreateCategoryDto) {
    const newCategory = await this.prismaService.category.create({
      data: categoryData,
    });
    return newCategory;
  }

  findAll() {
    return this.prismaService.category.findMany();
  }

  async findOneByName(name: string) {
    const category = await this.prismaService.category.findUnique({
      where: { name },
    });
    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  async update(name: string, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.prismaService.category.update({
      where: { name },
      data: updateCategoryDto,
    });
    return updatedCategory;
  }

  async remove(name: string) {
    const deletedCategory = await this.prismaService.category.delete({
      where: { name },
    });
    return deletedCategory;
  }
}
