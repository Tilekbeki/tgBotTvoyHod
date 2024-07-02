import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsergoalService } from './usergoal.service';
import { CreateUsergoalDto } from './dto/create-usergoal.dto';
import { UpdateUsergoalDto } from './dto/update-usergoal.dto';

@Controller('usergoal')
export class UsergoalController {
  constructor(private readonly usergoalService: UsergoalService) {}

  @Post()
  create(@Body() createUsergoalDto: CreateUsergoalDto) {
    return this.usergoalService.create(createUsergoalDto);
  }

  @Get()
  findAll() {
    return this.usergoalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usergoalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsergoalDto: UpdateUsergoalDto) {
    return this.usergoalService.update(+id, updateUsergoalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usergoalService.remove(+id);
  }
}
