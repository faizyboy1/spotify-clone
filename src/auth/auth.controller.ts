import { ValidateTokenDTO } from './dto/validate-token.dto';
import { UpdateResult } from 'typeorm';
import { Enable2FAType } from './types/auth.types';
import { JwtAuthGuard } from './jwt.guard';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { User } from './../users/user.entity';
import { UsersService } from './../users/users.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private usersService:UsersService,
        private authService:AuthService){}
    @Post('signup')
    signup(@Body()userDto:CreateUserDto):Promise<User>{
        return this.usersService.create(userDto);
    }
    @Post('login')
    login(@Body()loginDto:LoginDto):Promise<{accessToken:string}|{ validate2FA: string; message: string }>{
        return this.authService.login(loginDto)
    }
    @Post('enable-2fa')
    @UseGuards(JwtAuthGuard)
    enable2FA(@Request() req):Promise<Enable2FAType>{
        return this.authService.enable2FA(req.user.userId)
    }

    @Get('disable-2fa')
    @UseGuards(JwtAuthGuard)
     disable2FA(@Request() req,):Promise<UpdateResult>{
        return this.authService.disable2FA(req.user.userId)
    }

    @Post('validate-2fa')
    @UseGuards(JwtAuthGuard)
    validate2FA(@Request() req,
        @Body()
        validateTokenDTO:ValidateTokenDTO):Promise<{verified:boolean}>{
            return this.authService.validate2FA(req.user.userId,validateTokenDTO.token)
    }
}
