import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from 'src/auth/auth.service'
import { LocalStrategy } from 'src/auth/strategies/local.strategy'
import { UsersModule } from 'src/users/users.module'
import { BearerStrategy } from './strategies/bearer.strategy'

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy, BearerStrategy],
})
export class AuthModule {}
