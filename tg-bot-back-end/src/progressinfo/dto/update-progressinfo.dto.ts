import { PartialType } from '@nestjs/mapped-types';
import { CreateProgressinfoDto } from './create-progressinfo.dto';

export class UpdateProgressinfoDto extends PartialType(CreateProgressinfoDto) {}
