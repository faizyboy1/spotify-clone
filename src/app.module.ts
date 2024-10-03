import { dataSourceOptions, typeOrmAsyncConfig } from '../db/data-source';
import { SongsController } from './songs/songs.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from './env.validation';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.production.env'],
      isGlobal: true,
      load: [configuration],
      validate: validate,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SongsModule,
    PlaylistModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log(dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
    // consumer
    // .apply(LoggerMiddleware)
    // .forRoutes({ path:  'songs',  method:  RequestMethod.POST }); //option no 2
    consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option no 3
  }
}
