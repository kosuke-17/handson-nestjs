import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsDate } from 'class-validator'

export class PrismaEntity {
  @ApiProperty({ type: String })
  id: string

  @Type(() => Date)
  @ApiProperty({ type: Date })
  @IsDate()
  createdAt: Date

  @Type(() => Date)
  @ApiProperty({ type: Date })
  @IsDate()
  updatedAt: Date
}
