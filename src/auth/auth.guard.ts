import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { Request} from 'express';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if(!token){
            throw new HttpException('Access denied.', HttpStatus.UNAUTHORIZED);
        }

        try{
            const payload = await this.jwtService.verifyAsync(
                token,
                {secret: jwtConstants.secret}
            )
            request['user'] = payload;
        } catch {
            throw new HttpException('', HttpStatus.UNAUTHORIZED);
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined{
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type == 'Bearer' ? token : undefined;
    }
}