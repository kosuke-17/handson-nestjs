import { Module } from '@nestjs/common'
import { AppController } from 'src/app.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersModule } from './users/users.module'
import { LoggerService } from './logger/logger.service'
import { AuthModule } from './auth/auth.module'
import { UserInformationsModule } from './user-informations/user-informations.module'
import { PortfoliosModule } from './portfolios/portfolios.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, UserInformationsModule, PortfoliosModule],
  controllers: [AppController],
  providers: [LoggerService],
})
export class AppModule {}
