import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgressinfoService } from './progressinfo.service';
import { CreateProgressinfoDto } from './dto/create-progressinfo.dto';
import { UpdateProgressinfoDto } from './dto/update-progressinfo.dto';

@Controller('progressinfo')
export class ProgressinfoController {
  constructor(private readonly progressinfoService: ProgressinfoService) {}

  @Post()
  create(@Body() createProgressinfoDto: CreateProgressinfoDto) {
    return this.progressinfoService.create(createProgressinfoDto);
  }

  @Get()
  findAll() {
    return this.progressinfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressinfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgressinfoDto: UpdateProgressinfoDto) {
    return this.progressinfoService.update(+id, updateProgressinfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressinfoService.remove(+id);
  }
}
