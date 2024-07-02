import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateGoalDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    description: string;
  @IsDateString()
    deadline: Date;
    @IsNotEmpty()
    @IsString()
  categoryName: string;
}