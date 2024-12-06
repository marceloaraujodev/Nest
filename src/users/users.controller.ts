import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

// interface user {username: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}

// all received params comes as strings so + to turn into numbers hehe

@Controller('users') // this is a decorator /users
export class UsersController {

  constructor(private readonly usersService: UsersService){}

  // The query is used inside the method not the decorator itself
  // GET users 
  @Get() // /users - using query params /users?role=value - Called decorators
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {  // those are class methods of the UsersController
    return this.usersService.findAll(role) // sends this info to service file
  }

  // GET users/:id - If I have any other get route that uses users/<anything> it needs to be before this route, else this route will get all routes. if you have users/interns it has to be before the users/:id route ⚠️
  @Get(':id') // users/id
  findOne(@Param('id', ParseIntPipe) id: number){ // parserInt will change the string from params to number
    return this.usersService.findOne(+id)
  }

  // POST users
  @Post() 
  create(@Body() user: {username: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
    console.log(user)

    return this.usersService.create(user)
  }
  // PATCH /users/:id | in the patch since is update we have the id and we also receive a body with the update
  @Patch(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: {username?: string; email?: string; role?: "INTERN" | "ENGINEER" | "ADMIN"}){
    console.log(userUpdate)
    return this.usersService.updateOne(id, userUpdate)
  }
  // DELETE /users/:id
  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number){
    console.log(id);
    return this.usersService.deleteOne(id);
  }
}
