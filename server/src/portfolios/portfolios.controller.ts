import { FindAllByLoginUserPortfolioResponseDto } from './dto/find-all-potfolio.dto'
import { UpsertPortfolioDto } from './dto/upsert-portfolio.dto'
import { PortfoliosService } from './portfolios.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { BearerAuthGuard } from 'src/auth/bearer-auth.guard'
import { LoginUser } from 'src/auth/decolators/users.decorator'
import { ResponseMeDto } from 'src/users/dtos/response-login-user.dto'

@UseGuards(BearerAuthGuard)
@Controller('portfolios')
export class PortfoliosController {
  constructor(readonly portfoliosService: PortfoliosService) {}

  @Post()
  async upsert(
    @LoginUser() user: ResponseMeDto,
    @Body() upsertPortfolioDto: UpsertPortfolioDto,
  ) {
    await this.portfoliosService.upsert({ user, upsertPortfolioDto })
  }

  @Get()
  async findAllByLoginUser(
    @LoginUser() user: ResponseMeDto,
  ): Promise<FindAllByLoginUserPortfolioResponseDto> {
    return await this.portfoliosService.findAllByLoginUser({ user })
  }

  @Delete(':id')
  async delete(@LoginUser() user: ResponseMeDto, @Param('id') id: string) {
    await this.portfoliosService.delete({ user, id })
  }
}
