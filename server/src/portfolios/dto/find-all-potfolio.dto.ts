import { PortfolioEntity } from '../entities/portfolio.entity'
import { PickType } from '@nestjs/swagger'

class PotfolioFindAllByLoginUser extends PickType(PortfolioEntity, [
  'id',
  'name',
  'url',
]) {}

export class FindAllByLoginUserPortfolioResponseDto {
  data: PotfolioFindAllByLoginUser[]
}
