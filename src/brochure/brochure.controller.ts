import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrochureService } from './brochure.service';
import { CreateBrochureDto } from './dto/create-brochure.dto';
import { UpdateBrochureDto } from './dto/update-brochure.dto';

@Controller('brochure')
export class BrochureController {
  constructor(private readonly brochureService: BrochureService) {}

  @Post('/process')
  processBrochure(@Body() createBrochureDto: CreateBrochureDto) {
    return this.brochureService.processBrochure(createBrochureDto);
  }

  @Post()
  create(@Body() createBrochureDto: CreateBrochureDto) {
    //test
    return this.brochureService.create(createBrochureDto);
  }

  @Get()
  findAll() {
    return this.brochureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brochureService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrochureDto: UpdateBrochureDto,
  ) {
    return this.brochureService.update(+id, updateBrochureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brochureService.remove(+id);
  }
}
