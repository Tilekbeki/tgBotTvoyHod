import { IsDateString, IsNumber, IsString, IsNotEmpty, IsEnum, isEnum, IsBoolean } from 'class-validator';

export class CreateHelpReqDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;
    @IsString()
    nickName: string;
    @IsNotEmpty()
    @IsBoolean()
    Helped: boolean;
    
}
