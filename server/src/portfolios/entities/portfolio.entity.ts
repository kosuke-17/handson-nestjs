import { ApiProperty } from '@nestjs/swagger'
import { Portfolio } from '@prisma/client'
import { IsOptional, IsString } from 'class-validator'
import { PrismaEntity } from 'src/lib/prisma-entity'

export class PortfolioEntity extends PrismaEntity {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, nullable: true })
  name?: Portfolio['name']

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, nullable: true })
  url?: Portfolio['url']
}
