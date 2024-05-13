import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { User, Prisma, UserSecret } from '@prisma/client'
import { v4 as uuid } from 'uuid'
import { PrismaService } from 'src/prisma/prisma.service'
import { LoggerService } from 'src/logger/logger.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserSecretDto } from './dtos/update-user-secret.dto'
import { ResponseLoginUserDto } from './dtos/response-login-user.dto'

export type FindOneType = User & { secret: UserSecret }

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: LoggerService,
  ) {}

  async findOne(id: string): Promise<FindOneType | null> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { id },
        include: {
          secret: true,
        },
      })
      return user
    } catch (e) {
      this.logger.error(e)
    }
  }

  async findOneByEmail(email: string): Promise<ResponseLoginUserDto> {
    try {
      const user = await this.prisma.user.findFirst({
        where: { email },
        include: { secret: true },
      })
      return user
    } catch (e) {
      this.logger.error(e)
    }
  }

  async loginByToken(token: string) {
    try {
      const userSecret = await this.prisma.userSecret.findFirst({
        where: { token },
        select: { user: { select: { id: true } } },
      })

      if (!userSecret) throw new UnauthorizedException('user secret not found')

      const user = await this.prisma.user.findFirst({
        where: { id: userSecret.user.id },
        include: { userInformation: { select: { id: true } } },
      })

      if (!user) throw new UnauthorizedException('user not found')

      return user
    } catch (e) {
      this.logger.error(e)
    }
  }

  async logoutByToken(updateUserSecretDto: UpdateUserSecretDto) {
    const secret = await this.prisma.userSecret.findFirst({
      where: { token: updateUserSecretDto.token },
    })
    if (!secret) throw new NotFoundException('secret not found')

    try {
      await this.prisma.userSecret.update({
        where: { id: secret.id },
        data: { token: null },
      })
    } catch (e) {
      this.logger.error(e)
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany()
    } catch (e) {
      this.logger.error(e)
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto

    try {
      const user = await this.prisma.user.create({
        data: { ...rest },
      })

      await this.prisma.userSecret.create({
        data: {
          token: uuid(),
          password,
          user: { connect: { id: user.id } },
        },
      })

      return this.prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          secret: { select: { token: true } },
        },
      })
    } catch (e) {
      this.logger.error(e)
    }
  }

  async createToken(userId: string) {
    try {
      const secret = await this.prisma.userSecret.update({
        where: { userId },
        data: { token: uuid() },
      })

      return secret.token
    } catch (e) {
      this.logger.error(e)
    }
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { where, data } = params
    return this.prisma.user.update({
      data,
      where,
    })
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    })
  }
}
