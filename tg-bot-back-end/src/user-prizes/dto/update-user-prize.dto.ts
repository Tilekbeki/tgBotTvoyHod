import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPrizeDto } from './create-user-prize.dto';

export class UpdateUserPrizeDto extends PartialType(CreateUserPrizeDto) {}
