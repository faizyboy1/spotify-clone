import { ValidateTokenDTO } from './dto/validate-token.dto';
import { UpdateResult } from 'typeorm';
import { Enable2FAType } from './types/auth.types';
import { PayloadType } from './types/payload.type';
import { ArtistsService } from './../artists/artists.service';
import { LoginDto } from './dto/login.dto';
import { User } from './../users/user.entity';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcryptjs";
import * as speakeasy from 'speakeasy';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private usersService:UsersService,
        private artistsService:ArtistsService,
        private jwtService:JwtService){}

    async login(loginDto:LoginDto):Promise<{accessToken:string} | { validate2FA: string; message: string }> {
        const user = await this.usersService.findOne(loginDto)
        const passwordMatched =bcrypt.compare(loginDto.password,user.password)
        if (passwordMatched) {
            delete user.password;
            // return user
            const artist = await this.artistsService.findArtist(user.id)
            console.log({artist,...(artist && {artistId: artist.id})});
            const payload:PayloadType = { email: user.email, userId: user.id,...(artist && {artistId: artist.id}) };
            console.log({payload});
            if(user.enable2FA && user.twoFASecret){
                return{
                    validate2FA:'http://localhost:3000/auth/validate-2fa',
                    message:'Please send the one-time password/token from your Google Authenticator App'
                }
            }
            return {
                accessToken: this.jwtService.sign(payload),
            };
            } 
            
        throw new UnauthorizedException("Password does not match");
            
    }

    async enable2FA(userId:number) : Promise<Enable2FAType>{
        const user = await this.usersService.findById(userId)
        if(user.enable2FA){
            return {secret:user.twoFASecret}
        }
        const secret = speakeasy.generateSecret()
        user.twoFASecret=secret.base32
        await this.usersService.updateSecretKey(user.id,user.twoFASecret);
        return {secret:user.twoFASecret}
    }

    async disable2FA(userId:number):Promise<UpdateResult>{
        return this.usersService.diable2FA(userId)
    }

    async validate2FA(userId:number,validateTokenDTO:string):Promise<{verified:boolean}>{
        try {
            
            const user = await this.usersService.findById(userId)
            const verified = speakeasy.totp.verify({
                secret:user.twoFASecret,
                token:validateTokenDTO,
                encoding:'base32'
            })
            if(verified){
                return {verified:true}
            }
            return {verified:false}
        } catch (error) {
            throw new UnauthorizedException('Error verifying token');
        }
    }
    
    async validateUserByApiKey (apiKey:string):Promise<User> {
        return await this.usersService.findByApiKey(apiKey)
    }
}
