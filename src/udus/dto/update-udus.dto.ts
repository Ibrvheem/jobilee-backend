import { PartialType } from '@nestjs/mapped-types';
import { CreateUdusDto } from './create-udus.dto';

export class UpdateUdusDto extends PartialType(CreateUdusDto) {}
