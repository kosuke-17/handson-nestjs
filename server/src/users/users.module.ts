import { Module } from '@nestjs/common'
import { LoggerModule } from 'src/logger/logger.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [LoggerModule],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
