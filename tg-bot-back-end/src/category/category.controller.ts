import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.categoryService.findOneByName(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(name, updateCategoryDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.categoryService.remove(name);
  }
}
