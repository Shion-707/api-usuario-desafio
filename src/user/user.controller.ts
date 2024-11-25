import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*
  @Post()
  create(@Body() user: User) {
    return this.userService.create(user);
  }
  */

  @ApiOperation({ summary: "Obtiene todos los usuarios. Para dev." })
  @ApiOkResponse({ description: "Muestra todos los usuarios en la bd" })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: "Obtiene un usuario por el email. Para dev." })
  @ApiOkResponse({ description: "Muestra la información del usuario." })
  @ApiNotFoundResponse({ description: "Usuario no encontrado." })
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  /*
  @Post('forgot')
  forgotPassword(@Body() email: String){
    return this.forgotPassword(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }*/
}
