import { Playlist } from './../playlist/playlist.entity';
import { Artist } from './../artists/artist.entity';
import { Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column({unique:true})
    email:string;

    @Column()
    @Exclude()
     password: string;

     @OneToOne(()=>Artist)
     @JoinColumn()
     artist:Artist

     @OneToMany(()=>Playlist,(playlist)=>playlist.user)
     playlists:Playlist[];

     @Column({nullable:true,type:'text'})
     twoFASecret:string;

     @Column({default:false, type:'boolean'})
     enable2FA:boolean

     @Column({nullable:true,type:"text"})
     apiKey:string;


}