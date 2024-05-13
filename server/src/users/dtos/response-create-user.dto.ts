import { ApiProperty, PickType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { UserEntity } from '../entities/user.entity'
import { UserSecretEntity } from '../entities/userSecret.entity'

class userSecretForUserCreateResponseDto extends PickType(UserSecretEntity, [
  'token',
]) {}

export class UserCreateResponseDto extends PickType(UserEntity, ['id']) {
  @Type(() => userSecretForUserCreateResponseDto)
  @ApiProperty({
    type: userSecretForUserCreateResponseDto,
  })
  secret: userSecretForUserCreateResponseDto
}
