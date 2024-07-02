import { IsDateString, IsNotEmpty, IsString,IsNumber } from 'class-validator';

export enum prizeTypes {
    link = 'link',
    promo = 'promo',
    file = 'file',
    another = 'another'
  }

export class CreatePrizeDto {
    type:prizeTypes;
    @IsNotEmpty()
    @IsString()
    content:string;
}
