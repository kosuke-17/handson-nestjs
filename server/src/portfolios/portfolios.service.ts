import { Injectable } from '@nestjs/common'
import { LoggerService } from 'src/logger/logger.service'
import { UpsertPortfolioDto } from 'src/portfolios/dto/upsert-portfolio.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { ResponseMeDto } from 'src/users/dtos/response-login-user.dto'

@Injectable()
export class PortfoliosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService,
  ) {}

  async upsert({
    user,
    upsertPortfolioDto,
  }: {
    user: Pick<ResponseMeDto, 'id'>
    upsertPortfolioDto: UpsertPortfolioDto
  }) {
    const { portfolios } = upsertPortfolioDto
    try {
      await this.prisma.$transaction(async (tscPrisma) => {
        for (const p of portfolios) {
          await tscPrisma.portfolio.upsert({
            where: { id: p.id },
            update: { ...p },
            create: {
              name: p.name ?? undefined,
              url: p.url ?? undefined,
              user: { connect: { id: user.id } },
            },
          })
        }
      })
    } catch (e) {
      this.logger.error(e)
    }
  }

  async findAllByLoginUser({ user }: { user: Pick<ResponseMeDto, 'id'> }) {
    const portfolio = await this.prisma.portfolio.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        name: true,
        url: true,
      },
    })
    return { data: portfolio }
  }

  async delete(params: { user: Pick<ResponseMeDto, 'id'>; id: string }) {
    try {
      await this.prisma.portfolio.delete({
        where: { id: params.id },
      })
    } catch (e) {
      this.logger.error(e)
    }
  }
}
