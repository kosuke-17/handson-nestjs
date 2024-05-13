import { Global, Module } from '@nestjs/common'
import { LoggerService } from './logger.service'
import { LoggerModule as PinoLoggerModule, Params } from 'nestjs-pino'
import { isDev } from 'src/lib/checkEnv'

const params: Params = {
  pinoHttp: {
    transport: isDev
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            messageKey: 'message',
          },
        }
      : undefined,
    customLogLevel: (req, res, err) => {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        return 'warn'
      } else if (res.statusCode >= 500 || err) {
        return 'error'
      }
      return 'info'
    },
  },
}

@Global()
@Module({
  imports: [PinoLoggerModule.forRoot(params)],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
