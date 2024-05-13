import { PickType } from '@nestjs/swagger'
import { UserSecretEntity } from '../entities/userSecret.entity'

export class UpdateUserSecretDto extends PickType(UserSecretEntity, [
  'token',
]) {}
