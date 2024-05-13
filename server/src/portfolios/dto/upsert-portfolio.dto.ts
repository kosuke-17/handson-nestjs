import { PortfolioEntity } from '../entities/portfolio.entity'
import { PickType } from '@nestjs/swagger'

export class PortfolioForUpsert extends PickType(PortfolioEntity, [
  'id',
  'name',
  'url',
]) {}

export class UpsertPortfolioDto {
  portfolios: PortfolioForUpsert[]
}
