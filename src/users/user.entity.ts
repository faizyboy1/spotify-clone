import { Playlist } from './../playlist/playlist.entity';
import { Artist } from './../artists/artist.entity';
import { Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column()
    email:string;

    @Column()
     password: string;

     @OneToOne(()=>Artist)
     @JoinColumn()
     artist:Artist

     @OneToMany(()=>Playlist,(playlist)=>playlist.user)
     playlists:Playlist[];
}