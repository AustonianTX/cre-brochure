import { Module } from '@nestjs/common';
import { BrochureService } from './brochure.service';
import { BrochureController } from './brochure.controller';
import { ConfigModule } from '@nestjs/config/dist';

@Module({
  controllers: [BrochureController],
  providers: [BrochureService],
  imports: [ConfigModule],
})
export class BrochureModule {}
