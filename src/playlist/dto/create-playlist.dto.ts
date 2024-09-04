import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
export class CreatePlayListDto {
    
    @IsString()
    @IsNotEmpty()
    readonly name;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({},{each:true})
    readonly songs;

    @IsNumber()
    @IsNotEmpty()
    readonly user:number;

    
}