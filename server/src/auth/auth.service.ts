import { Injectable, UnauthorizedException } from '@nestjs/common'
import { comparePassword } from 'src/lib/user'
import { ResponseLoginUserDto } from 'src/users/dtos/response-login-user.dto'

import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<ResponseLoginUserDto> {
    const user = await this.usersService.findOneByEmail(email)
    const canLogin = await comparePassword(pass, user.secret.password)

    if (canLogin) {
      const token = await this.usersService.createToken(user.id)
      return { ...user, secret: { ...user.secret, token } }
    } else {
      throw new UnauthorizedException('パスワードが一致しませんでした')
    }
  }
}
