import { Artist } from './../artists/artist.entity';
import { UpdateSongDto } from './dto/update-song.dto';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './song.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class SongsService {
 // local DB
   // local array
   private readonly songs = [];
   constructor(@InjectRepository(Song) 
   private songRepository:Repository<Song>,
   @InjectRepository(Artist)
   private artistRepository:Repository<Artist>){
    
   }

   async create(songDto:CreateSongDto):Promise<Song> {
     // Save the song in the database
     const song = new Song();
     song.title=songDto.title;
     song.duration=songDto.duration;
     song.lyrics=songDto.lyrics;
     song.releasedDate=songDto.releasedDate

     const artists = await this.artistRepository.findByIds(songDto.artists)
     song.artists=artists;

     return await this.songRepository.save(song);
     
   }
  async update (id:number,updateSongDto:UpdateSongDto):Promise<UpdateResult> {
    return this.songRepository.update(id,updateSongDto)
  }
async findAll():Promise<Song[]> {
     // fetch the songs from the db
     return await this.songRepository.find();
   }

async findOne(id:number):Promise<Song>{
  return await this.songRepository.findOneBy({id})
}

async delete(id:number):Promise<void>{
  await this.songRepository.delete(id)
}

async paginate(options:IPaginationOptions):Promise<Pagination<Song>>{
  return paginate<Song>(this.songRepository,options)
}
}
