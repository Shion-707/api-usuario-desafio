import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { forgotPasswordDto } from './dto/forgot-pass.dto';
import { resetPasswordDto } from './dto/reset-pass.dto';
import { signUpDto } from './dto/sign-up.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiOperation({ summary: "Registra un usuario." })
    @ApiCreatedResponse({ description: "Usuario registrado correctamente." })
    @ApiBadRequestResponse({ description: "Bad request." })
    @Post('register')
    signUp(@Body() user: signUpDto) {
    return this.authService.signUp(user);
    }

    @ApiOperation({ summary: "Inicio de sesión." })
    @ApiCreatedResponse({ description: "Token jwt creado." })
    @ApiUnauthorizedResponse({ description: "Datos incorrectos o usuario inactivo." })
    @ApiNotFoundResponse({ description: "Usuario no encontrado." })
    @Post('login')
    signIn(@Body() user: signInDto){
        return this.authService.signIn(user);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: "Perfil de usuario. Solo accesible con token." })
    @ApiOkResponse({ description: "Da la bienvenida al usuario." })
    @ApiUnauthorizedResponse({ description: "Acceso denegado." })
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return 'Bienvenido/a ' + req.user.userFullName;
    }

    @ApiOperation({ summary: "Módulo para recuperar la contraseña." })
    @ApiCreatedResponse({ description: "Envío de email con el link para recuperar contraseña." })
    @ApiBadRequestResponse({ description: "Bad request." })
    @Post('forgot-password')
    forgotPassword(@Body() email: forgotPasswordDto){
        return this.authService.forgotPassword(email);
    }

    @ApiOperation({ summary: "Resetea la contraseña usando un token." })
    @ApiOkResponse({ description: "Contraseña actualizada correctamente." })
    @ApiNotFoundResponse({ description: "Token no encontrado o inválido." })
    @ApiBadRequestResponse({ description: "Bad request." })
    @Put('reset-password/:token')
    resetPassword(@Param('token') token: string, @Body() pass: resetPasswordDto){
        return this.authService.resetPassword(token, pass);
    }
}
