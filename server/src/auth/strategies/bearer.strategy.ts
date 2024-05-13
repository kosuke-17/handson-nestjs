import { Strategy } from 'passport-http-bearer'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { UsersService } from 'src/users/users.service'
import { ResponseMeDto } from 'src/users/dtos/response-login-user.dto'

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super()
  }

  async validate(token: string) {
    const user: ResponseMeDto = await this.usersService.loginByToken(token)
    return user
  }
}
