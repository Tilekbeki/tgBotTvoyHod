import { IsDateString, IsNumber, IsString, IsNotEmpty,IsEnum, isEnum  } from 'class-validator';

export enum StatusesTypes {
    ACTIVE = 'active',
    INPROGRESS = 'inProgress',
    CANCELED = 'canceled',
    DONE = 'done',
  }

export class CreateProgressinfoDto {
    
    @IsDateString()
    dateChecked: Date;
    
    @IsString()
    admin: string;
    
    @IsNotEmpty() // Добавьте IsNotEmpty для обязательности поля goalId
    @IsNumber()
    goalId: number;
    
    status: StatusesTypes;
    
    @IsString()
    comment: string;
}
