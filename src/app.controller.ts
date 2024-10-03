import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt.guard';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
@ApiTags("app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(
    @Request()
    req,
  ) {
    return req.user;
  }
}
