import { IsNumber, IsString, IsNotEmpty  } from 'class-validator';

export enum contentTypes {
    video = 'video',
    img = 'img'
  }

export class CreateResultDto {
    @IsNotEmpty()
    @IsString()
    link:string;
    type:contentTypes;
    @IsNotEmpty()
    @IsNumber()
    progressInfoId: number;
}
