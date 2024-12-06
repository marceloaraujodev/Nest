import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';

@Controller('users') // this is a decorator /users
export class UsersController {
  // GET users 
  @Get() // /users
  findAll() {
    return ['hi']
  }

  @Get('interns') //⚠️ = users/interns
  findAllInterns() {
    return []
  }

  // GET users/:id - If I have any other get route that uses users/<anything> it needs to be before this route, else this route will get all routes. if you have users/interns it has to be before the users/:id route ⚠️
  @Get(':id') // users/id
  findOne(@Param('id') id: string){
    return {id}
  }

  // POST users
  @Post() 
  create(@Body() user: {}){
    return user 
  }
  // PATCH /users/:id
  // DELETE /users/:id
}
