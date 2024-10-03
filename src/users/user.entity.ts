import { Playlist } from './../playlist/playlist.entity';
import { Artist } from './../artists/artist.entity';
import { Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @ApiProperty({
    example: "Jane",
    description: "Provide the first name of the user",
    })
    @Column()
    firstName:string;

    @ApiProperty({
    example: "Doe",
    description: "Provide the Last name of the user",
    })
    @Column()
    lastName:string;

    @ApiProperty({
    example: "example@gmail.com",
    description: "Provide the email of the user",
    })
    @Column({unique:true})
    email:string;

    @ApiProperty({
    example: "03214528674",
    description: "Provide the Phone of the user",
    })
    @Column({nullable:true})
    phone: string

    @Column()
    @Exclude()
     password: string;

     @OneToOne(()=>Artist)
     @JoinColumn()
     artist:Artist

     @OneToMany(()=>Playlist,(playlist)=>playlist.user)
     playlists:Playlist[];

     @ApiProperty({
    example: "123456789",
    description: "This will store the Secret Key (pass the userId in BODY of /enable-2fa POST request)",
    })
     @Column({nullable:true,type:'text'})
     twoFASecret:string;
    
     @ApiProperty({
    example: "false",
    description: "This will tell if the user 2FA is enabled or not (pass the userId in BODY of /enable-2fa POST request)",
    })
     @Column({default:false, type:'boolean'})
     enable2FA:boolean

     @ApiProperty({
    example: "faeabd3f-458b-4b30-bd32-a9a428d57dc3",
    description: "This key is an encrypted automated generated KEY",
    })
     @Column({nullable:true,type:"text"})
     apiKey:string;


}