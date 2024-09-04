import { Artist } from './../artists/artist.entity';
import { Song } from './song.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Song,Artist])],
  controllers: [SongsController],
  providers: [SongsService]
})
export class SongsModule {}
