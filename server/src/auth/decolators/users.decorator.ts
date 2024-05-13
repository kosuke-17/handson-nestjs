import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ResponseMeDto } from '../../users/dtos/response-login-user.dto'

export const LoginUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user as ResponseMeDto
})
