import { User } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

export class UserEntity {
  @ApiProperty({ type: String })
  id: User['id']

  @ApiProperty({ type: Date })
  createdAt: User['createdAt']

  @ApiProperty({ type: Date })
  updatedAt: User['updatedAt']

  @ApiProperty({ type: String })
  firstName: User['firstName']

  @ApiProperty({ type: String })
  lastName: User['lastName']
}
