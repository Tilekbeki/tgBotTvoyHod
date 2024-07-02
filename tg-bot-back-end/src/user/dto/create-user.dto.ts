import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsNumber()
    chatId: number;
    @IsNotEmpty()
    @IsString()
    name: string;
}
