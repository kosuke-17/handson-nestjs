import { UserSecret } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class UserSecretEntity {
  @ApiProperty({ type: String })
  id: UserSecret['id']

  @ApiProperty({ type: Date })
  createdAt: UserSecret['createdAt']

  @ApiProperty({ type: Date })
  updatedAt: UserSecret['updatedAt']

  @ApiProperty({ type: String })
  password: UserSecret['password']

  @ApiProperty({ type: String })
  token: UserSecret['token']
}
