import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUsergoalDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;
    @IsNotEmpty()
    @IsNumber()
    goalId: number;
}
