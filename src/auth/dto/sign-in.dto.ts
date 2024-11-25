import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class signInDto{
    @IsEmail()
    @MaxLength(50)
    email: string

    @IsString()
    @MaxLength(50)
    @MinLength(8)
    password: string
}