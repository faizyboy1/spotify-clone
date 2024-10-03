import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName:string;

    @IsString()
    @IsNotEmpty()
    lastName:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsString()
    @IsOptional()
    phone:string;
}
