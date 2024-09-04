import { Song } from './../songs/song.entity';
import { User } from './../users/user.entity';
import { JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('artists')
export class Artist{
    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(()=>User)
    @JoinColumn()
    user:User

    @OneToMany(()=>Song,(song)=>song.artists)
    songs:Song[]

}