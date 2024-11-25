import { IsString, MinLength } from "class-validator"

export class resetPasswordDto{
    @IsString()
    @MinLength(8)
    password: string
}