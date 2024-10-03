import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiKeyStrategy } from './ApiKeyStrategy.strategy';
import { ArtistsModule } from './../artists/artists.module';
import { authConstants } from './auth.constants';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports:[
    PassportModule,
    UsersModule,
    ArtistsModule,
    JwtModule.registerAsync(
      {imports:[],
        useFactory:async(configService:ConfigService)=>({
          secret:configService.get<string>('secret'),
          signOptions:{
            expiresIn:'1d'
          }
        }),
        inject:[ConfigService]
        }
    )],
  controllers: [AuthController],
  providers: [AuthService,JWTStrategy,ApiKeyStrategy],
  exports:[AuthService]
})
export class AuthModule {}
