import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    surname: string;
}
