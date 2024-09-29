import { LoginDto } from './../auth/dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from "bcryptjs";
import {v4 as uuid4} from 'uuid'
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User)private userRepository:Repository<User>){}
    async create(usersDto:CreateUserDto):Promise<User> {
        const salt = await bcrypt.genSalt()
        usersDto.password = await bcrypt.hash(usersDto.password,salt)
        
        const user = await this.userRepository.save({...usersDto,apiKey:uuid4()})
        delete user.password; 
        return user;
    }

    async findOne(loginDto:LoginDto):Promise<User>{
        const user = await this.userRepository.findOneBy({email:loginDto.email})
        if (!user) {
            throw new UnauthorizedException('Could not find user');
            }
            return user;
    }

    async findById(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id: id });
        }
    async updateSecretKey (userId:number,secret:string):Promise<UpdateResult>{
        return this.userRepository.update({id:userId},{twoFASecret:secret,enable2FA:true})
    }
    
    async diable2FA(userId:number):Promise<UpdateResult>{
        return this.userRepository.update({id:userId},{enable2FA:false,twoFASecret:null})
    }

    async findByApiKey (apiKey:string):Promise<User>{
        return this.userRepository.findOneBy({apiKey})
    }

}
