import {
  Controller,
  Post,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'

import { LocalAuthGuard } from 'src/auth/local-auth.guard'
import { LoginDto } from 'src/users/dtos/login.dto'
import { ResponseLoginUserDto } from './users/dtos/response-login-user.dto'
import { LoginUser } from './auth/decolators/users.decorator'

@Controller()
export class AppController {
  // @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginDto })
  async login(@LoginUser() user: ResponseLoginUserDto) {
    return user
  }
}
