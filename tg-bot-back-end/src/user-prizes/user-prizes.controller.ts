import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPrizesService } from './user-prizes.service';
import { CreateUserPrizeDto } from './dto/create-user-prize.dto';
import { UpdateUserPrizeDto } from './dto/update-user-prize.dto';

@Controller('user-prizes')
export class UserPrizesController {
  constructor(private readonly userPrizesService: UserPrizesService) {}

  @Post()
  create(@Body() createUserPrizeDto: CreateUserPrizeDto) {
    return this.userPrizesService.create(createUserPrizeDto);
  }

  @Get()
  findAll() {
    return this.userPrizesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPrizesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPrizeDto: UpdateUserPrizeDto) {
    return this.userPrizesService.update(+id, updateUserPrizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPrizesService.remove(+id);
  }
}
