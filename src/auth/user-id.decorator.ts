import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { JwtService } from "@nestjs/jwt";

export const UserId = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const token = request.headers.authorization.replace('Bearer ', '')
    return JwtService
  }
)