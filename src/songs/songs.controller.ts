import { Pagination } from 'nestjs-typeorm-paginate';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { SongsService } from './songs.service';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    const result = this.songsService.create(createSongDto);
    return result;
  }
  @Get()
  findAll(@Query('page',new DefaultValuePipe(1),ParseIntPipe)page:number=1,
  @Query('limit',new DefaultValuePipe(10),ParseIntPipe)limit:number=10
  ): Promise < Pagination < Song >> {
    try {
      return this.songsService.paginate({page,limit});
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ): Promise<Song> {
    return this.songsService.findOne(id);
  }
  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDto);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.songsService.delete(id);
  }

}
