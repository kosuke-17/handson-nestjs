import { PickType } from '@nestjs/swagger'
import { UserEntity } from '../entities/user.entity'

export class UserResponseDto extends PickType(UserEntity, [
  'firstName',
  'lastName',
]) {}
