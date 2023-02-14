import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrochureModule } from './brochure/brochure.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BrochureModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
