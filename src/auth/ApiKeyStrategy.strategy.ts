import { UnauthorizedException, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy){
    constructor (private authService:AuthService){
        super()
    }
    async validate(apiKey:string){
        const user = await this.authService.validateUserByApiKey(apiKey)
        if(!user)
        throw new UnauthorizedException();
        return user
    }
}