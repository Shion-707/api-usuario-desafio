import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { checkPassword, generateRandomTokenPassword, hashPassword } from 'src/utils/utils-auth';
import { signInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { forgotPasswordDto } from './dto/forgot-pass.dto';
import { EmailService } from 'src/email/email.service';
import { resetPasswordDto } from './dto/reset-pass.dto';
import { signUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userServide: UserService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService
    ){}

    async signUp(userData: signUpDto){
        const passHash = hashPassword(userData.password);
        userData.password = passHash;

        return this.userServide.create(userData);
    }

    async signIn(userPass: signInDto){
        const userFound = await this.userServide.findByEmail(userPass.email);

        if(!checkPassword(userPass.password, userFound.password)){
            throw new HttpException('Email or password wrong', HttpStatus.UNAUTHORIZED)
        }

        if(!userFound.active) throw new HttpException('Inactive user', HttpStatus.UNAUTHORIZED);

        const{password, ...user} = userFound;

        const payLoad = { id: user.id, email: user.email, userFullName: user.name + ' ' + user.lastname};
        const token = await this.jwtService.signAsync(payLoad);

        return {token};
    }

    async forgotPassword(email: forgotPasswordDto){
        const userFound = await this.userServide.findByEmail(email.email);
    
        const token = generateRandomTokenPassword();
        userFound.tokenPassword = token;
        userFound.updatedAt = new Date();
    
        const {id, ...data} = userFound;
        
        this.userServide.update(id, data);
        //this.emailService.sendEmailPassForgot(email.email.toString(), token);
            
        return {"message": "Email sent."};
    }

    async resetPassword(token: string, password: resetPasswordDto){
        const userFound = await this.userServide.findByTokenpass(token);
        userFound.tokenPassword = null;
        userFound.updatedAt = new Date();
        userFound.password = hashPassword(password.password);

        const {id, ...data} = userFound;
        
        this.userServide.update(id, data);

        return {"message": "Updated password."};
        
    }
}
