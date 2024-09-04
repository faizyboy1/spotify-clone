import { User } from './../users/user.entity';
import { Song } from './../songs/song.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('playlists')
export class Playlist {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    /**
   * Each Playlist will have multiple songs
   */

    @OneToMany(()=>Song,(song)=>song.playlist)
    songs:Song[]

    /**
     * Many Playlist can belong to a single unique user
     */

    @ManyToOne(()=>User,(user) => user.playlists)
    user:User
}