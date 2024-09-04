import { Playlist } from './playlist.entity';
import { CreatePlayListDto } from './dto/create-playlist.dto';
import { PlaylistService } from './playlist.service';
import { Body, Controller, Injectable, Post } from '@nestjs/common';

@Controller('playlist')
export class PlaylistController {
    constructor(private playlistService:PlaylistService){}
    @Post()
    create(
        @Body()
        playListDto:CreatePlayListDto
    ):Promise<Playlist>{

        return this.playlistService.create(playListDto)
    }
}
