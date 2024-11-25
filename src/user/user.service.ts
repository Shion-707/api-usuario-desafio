import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {

  constructor(private readonly prisma: PrismaService){}

  async create(user: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: user
      });
    } catch (error) {
      return new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findByEmail(email: string) {
    const userFound = await this.prisma.user.findUnique({
      where: { email }
    });

    if(!userFound){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async findByTokenpass(tokenPassword: string){
    const userFound = await this.prisma.user.findUnique({
      where: { tokenPassword }
    });

    if(!userFound){
      throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }
  
  async update(id: string, data: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: {id},
        data
      });
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST); 
    }
  }

  /*
  remove(id: string) {
    return `This action removes a #${id} user`;
  }*/
}
