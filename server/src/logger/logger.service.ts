import { PinoLogger } from 'nestjs-pino'

const levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']

const errorStackFormat = (ctx) => {
  if (ctx instanceof Error) {
    return error2logContext(ctx)
  } else if (typeof ctx === 'object') {
    const newContext = {}
    for (const key in ctx) {
      newContext[key] = error2logContext(ctx[key])
    }
    return newContext
  }
  return ctx
}

const error2logContext = (err) => {
  if (err instanceof Error) {
    return {
      ...err,
      name: err.name,
      message: err.message,
      stack: err.stack,
    }
  }
  return err
}

export class LoggerService extends PinoLogger {
  private _log(level: string, message: string, ...args: any[]) {
    if (typeof args[0] === 'object') {
      super[level]?.(errorStackFormat(args[0]), message, ...args.slice(1))
    } else {
      super[level]?.(message, ...args)
    }
  }

  log(level: string, message: string, ...args: any[]) {
    if (!levels.includes(level)) {
      args = [message, ...args]
      message = level
      level = 'debug'
    }
    this._log(level, message, args)
  }

  error(message: any, ...args: any[]) {
    this._log('error', message, ...args)
  }

  warn(message: string, ...args: any[]) {
    this._log('warn', message, ...args)
  }

  debug(message: string, ...args: any[]) {
    this._log('debug', message, ...args)
  }

  verbose(message: string, ...args: any[]) {
    this._log('verbose', message, ...args)
  }
}
