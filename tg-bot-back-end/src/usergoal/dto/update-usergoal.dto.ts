import { PartialType } from '@nestjs/mapped-types';
import { CreateUsergoalDto } from './create-usergoal.dto';

export class UpdateUsergoalDto extends PartialType(CreateUsergoalDto) {}
