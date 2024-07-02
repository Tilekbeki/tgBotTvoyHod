import { Injectable, HttpException, BadRequestException } from '@nestjs/common';



@Injectable()
export class SaveFilesService {
  async uploadFile(){
    return 'uploadFile'
  }
}
