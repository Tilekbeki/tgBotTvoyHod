import { IsDateString, IsNumber, IsString, IsNotEmpty,IsEnum, isEnum  } from 'class-validator';

export class CreateQuizDto {
    @IsNotEmpty()
    @IsNumber()
    goalId:number;
    @IsNotEmpty()
    @IsNumber()
    userId:number;
    @IsNotEmpty()
    @IsString()
    answers: string;
    @IsDateString()
    dateFilled: Date;
}
