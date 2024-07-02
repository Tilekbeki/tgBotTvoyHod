import { Controller, Get, Post, Body, Req, Patch, Query, Param, Delete, UseInterceptors, UploadedFile, NotFoundException } from '@nestjs/common';
import { SaveFilesService } from './save-files.service';
import * as path from 'path';
import { join } from 'path';
import fs from 'fs';
@Controller('files')

export class SaveFilesController {
  constructor(private readonly saveFilesService: SaveFilesService) { }

  @Get(':filename')
  @UseInterceptors(UseInterceptors)
    getStaticFileUrl(@Param('filename') filename: string) {
      // Изменяем путь к файлу, чтобы он указывал на директорию public/static/
      const filePath = join(__dirname, '..', '..', 'public', 'static', filename);
      if (!fs.existsSync(filePath)) {
        throw new NotFoundException(`File ${filename} not found`);
      } else {
        return { url: `/static/${filename}` };
      }
    }

  @Patch(':id')
  update() {
    return 'update';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'remove';
  }
}
