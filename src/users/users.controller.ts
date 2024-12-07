import { Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// interface user {name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}

// all received params comes as strings so + to turn into numbers hehe

@Controller('users') // this is a decorator /users
export class UsersController {

  constructor(private readonly usersService: UsersService){}

  // The query is used inside the method not the decorator itself
  // GET users 
  @Get() // /users - using query params /users?role=value - Called decorators
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {  // those are class methods of the UsersController
    console.log(this.usersService.findAll())
    return this.usersService.findAll(role) // sends this info to service file
  }

  // GET users/:id - If I have any other get route that uses users/<anything> it needs to be before this route, else this route will get all routes. if you have users/interns it has to be before the users/:id route ⚠️
  @Get(':id') // users/id
  findOne(@Param('id', ParseIntPipe) id: number){ // parserInt will change the string from params to number
    return this.usersService.findOne(+id)
  }

  // POST users | Validation pipe will validate against dtos, for both data types and use the class validator
  @Post() 
  create(@Body(ValidationPipe) user: CreateUserDto){
    console.log(user)

    return this.usersService.create(user)
  }
  // PATCH /users/:id | in the patch since is update we have the id and we also receive a body with the update
  @Patch(':id')
  updateOne(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDto){
    console.log('userUpdate:', userUpdate)
    return this.usersService.updateOne(id, userUpdate)
  }
  // DELETE /users/:id
  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number){
    console.log(id);
    return this.usersService.deleteOne(id);
  }
}


/* Notes

VALIDATION PIPES: 
When the @Post() route is hit, the ValidationPipe intercepts the request ⚠️after the middleware stage and before the actual controller method is executed.

More focused on transforming or validating data for a specific route or parameter (@Body, @Query, @Param, etc.).

Middleware runs before guards, interceptors, and pipes in the request lifecycle.!!!
*/