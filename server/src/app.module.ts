import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [LoggerService],
})
export class AppModule {}
