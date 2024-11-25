import { IsBoolean, IsDate, IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto{
    @IsEmail()
    email?: string

    @IsString()
    @MaxLength(50)
    name?: string

    @IsString()
    @MaxLength(50)
    lastname?: string

    @IsString()
    @MaxLength(50)
    @MinLength(8)
    password?: string

    @IsBoolean()
    active?: boolean

    @IsDate()
    updatedAt = new Date()

    @IsString()
    tokenPassword?: string
}
