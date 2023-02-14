import { PartialType } from '@nestjs/mapped-types';
import { CreateBrochureDto } from './create-brochure.dto';

export class UpdateBrochureDto extends PartialType(CreateBrochureDto) {}
