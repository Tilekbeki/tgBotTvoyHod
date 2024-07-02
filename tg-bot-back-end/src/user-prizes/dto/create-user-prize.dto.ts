import { IsDateString, IsNotEmpty, IsNumber,IsString } from 'class-validator';

export class CreateUserPrizeDto {
    @IsNotEmpty()
    @IsNumber()
    userId:number;
    @IsNotEmpty()
    @IsNumber()
    goalId:number;
    @IsNotEmpty()
    @IsNumber()
    prizeId:number;
    @IsString()
    Description: string;
}
