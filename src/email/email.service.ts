import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { env } from 'process';

@Injectable()
export class EmailService {
    private transporter: Transporter;

    constructor(){
        this.transporter = createTransport({
            service: 'Gmail',
            auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASS,
                
            }
        });
    }

    async sendEmailPassForgot(to: string, token: string){
        const resetLink = `https://api-usuario-desafio-production.up.railway.app/auth/reset-password/${token}`;
        const mailOptions = {
            from: 'Reset password',
            to,
            subject: 'Reset password',
            html: `<p>Link para recuperación de contraseña: </p> <p><a href="${resetLink}">Click aquí</a></p>`
        };

        await this.transporter.sendMail(mailOptions);
    }
}
