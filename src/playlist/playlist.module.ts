import { User } from './../users/user.entity';
import { Song } from './../songs/song.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistController } from './playlist.controller';
import { Playlist } from './playlist.entity';
import { PlaylistService } from './playlist.service';

@Module({
  imports:[TypeOrmModule.forFeature([Playlist,Song,User])],
  controllers: [PlaylistController],
  providers: [PlaylistService]
})
export class PlaylistModule {}
