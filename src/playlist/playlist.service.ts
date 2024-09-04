import { CreatePlayListDto } from './dto/create-playlist.dto';
import { Song } from './../songs/song.entity';
import { User } from './../users/user.entity';
import { Playlist } from './playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PlaylistService {
    constructor(@InjectRepository(Playlist)
    private playListRepositiry:Repository<Playlist>,

    @InjectRepository(User)
    private userRepository:Repository<User>,

    @InjectRepository(Song)
    private songRepository:Repository<Song>
    ) { }
    async create (createPlaylistDto:CreatePlayListDto): Promise<Playlist>{
        const playlist = new Playlist();
        playlist.name=createPlaylistDto.name;
         // songs will be the array of IDs that we are getting from the DTO object

        const songs = await this.songRepository.findByIds(createPlaylistDto.songs)
        //Set the relation for the songs with the playlist entity
        playlist.songs = songs;
        // A user will be the ID of the user we are getting from the request
            //When we implemented the user authentication this id will become the logged in user id

        const user = await this.userRepository.findOneBy({id:createPlaylistDto.user})
        playlist.user = user;
        return this.playListRepositiry.save(playlist)
    }
}
