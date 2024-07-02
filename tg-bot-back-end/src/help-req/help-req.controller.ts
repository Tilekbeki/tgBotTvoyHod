import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HelpReqService } from './help-req.service';
import { CreateHelpReqDto } from './dto/create-help-req.dto';
import { UpdateHelpReqDto } from './dto/update-help-req.dto';

@Controller('help-req')
export class HelpReqController {
  constructor(private readonly helpReqService: HelpReqService) {}

  @Post()
  create(@Body() createHelpReqDto: CreateHelpReqDto) {
    return this.helpReqService.create(createHelpReqDto);
  }

  @Get()
  findAll() {
    return this.helpReqService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helpReqService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHelpReqDto: UpdateHelpReqDto) {
    return this.helpReqService.update(+id, updateHelpReqDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helpReqService.remove(+id);
  }
}
