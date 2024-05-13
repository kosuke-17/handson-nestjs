import { OmitType } from '@nestjs/swagger'
import { UserInformationEntity } from '../entities/user-information.entity'

export class CreateUserInformationDto extends OmitType(UserInformationEntity, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
