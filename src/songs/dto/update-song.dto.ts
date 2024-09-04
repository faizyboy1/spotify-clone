import { IsNumber } from 'class-validator';
import { IsOptional, IsString,IsArray, IsDateString, IsMilitaryTime } from 'class-validator';
export class UpdateSongDto {

    @IsString()
    @IsOptional()
    readonly title;

    @IsOptional()
    @IsArray()
    @IsNumber({},{each:true})
    readonly artists;

    @IsDateString()
    @IsOptional()
    readonly releaseDate:Date;

    @IsMilitaryTime()
    @IsOptional()
    readonly duration:Date;

    @IsString()
    @IsOptional()
    readonly lyrics:string;

}