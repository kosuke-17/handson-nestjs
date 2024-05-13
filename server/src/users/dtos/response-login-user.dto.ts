import { ApiProperty, PickType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { UserInformationEntity } from 'src/user-informations/entities/user-information.entity'
import { UserEntity } from '../entities/user.entity'
import { UserSecretEntity } from '../entities/userSecret.entity'

class SecretForResponseLoginUser extends UserSecretEntity {}

class UserInformationForResponseMe extends PickType(UserInformationEntity, [
  'id',
]) {}

export class ResponseLoginUserDto extends UserEntity {
  @Type(() => SecretForResponseLoginUser)
  @ApiProperty({ type: SecretForResponseLoginUser })
  secret: UserSecretEntity
}

export class ResponseMeDto extends UserEntity {
  @Type(() => UserInformationForResponseMe)
  @ApiProperty({ type: UserInformationForResponseMe })
  userInformation: UserInformationForResponseMe
}
