import { Playlist } from './../playlist/playlist.entity';
import { Artist } from './../artists/artist.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  // @Column('varchar', { array: true })
  // artists: string[];
  @Column({ type: 'date' })
  releasedDate: Date;
  @Column({ type: 'time' })
  duration: Date;
  @Column({ type: 'text' })
  lyrics: string;

  @ManyToMany(()=>Artist,(artist)=>artist.songs,{cascade:true})
  @JoinTable({name:'songs-artists'})
  artists:Artist[]

  /**
   * Many songs can belong to the playlist for each unique user
*/

  @ManyToOne(()=>Playlist,(playlist)=>playlist.songs)
  playlist:Playlist;
}
