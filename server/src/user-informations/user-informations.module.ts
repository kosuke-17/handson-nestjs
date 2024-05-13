import { Module } from '@nestjs/common'
import { UserInformationsService } from './user-informations.service'
import { UserInformationsController } from './user-informations.controller'

@Module({
  providers: [UserInformationsService],
  controllers: [UserInformationsController],
})
export class UserInformationsModule {}
