import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class signUpDto{
    @IsEmail()
    @MaxLength(50)
    email: string

    @IsString()
    @MaxLength(50)
    name: string

    @IsString()
    @MaxLength(50)
    lastname: string

    @IsString()
    @MaxLength(50)
    @MinLength(8)
    password: string
}