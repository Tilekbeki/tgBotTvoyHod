import { PartialType } from '@nestjs/mapped-types';
import { CreateHelpReqDto } from './create-help-req.dto';

export class UpdateHelpReqDto extends PartialType(CreateHelpReqDto) {}
