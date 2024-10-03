import { Song } from '../src/songs/song.entity';
import { Artist } from 'src/artists/artist.entity';
import { Playlist } from 'src/playlist/playlist.entity';
import { User } from 'src/users/user.entity';
import { ConfigService, ConfigModule } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: 'postgres',
    host: configService.get<string>('host'),
    port: configService.get<number>('port'),
    username: configService.get<string>('username'),
    password: configService.get<string>('password'),
    database: configService.get<string>('database'),
    // entities: ["dist/**/*.entity.js"], //1
    entities: [User, Playlist, Artist, Song],
    // synchronize: false, // 2
    migrations: ['dist/db/migrations/*.js'], // 3
  }),
  inject: [ConfigService],
};
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'spotify-clone',
  entities: ['dist/**/*.entity.js'], //1
  synchronize: false, // 2
  migrations: ['dist/db/migrations/*.js'], // 3
};
const dataSource = new DataSource(dataSourceOptions); //4
export default dataSource;
