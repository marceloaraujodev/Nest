import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      "id": 1,
      "name": "john",
      "email": "john@example.com",
      "role": "ADMIN"
    },
    {
      "id": 2,
      "name": "paul",
      "email": "paul@example.com",
      "role": "INTERN"
    },
    {
      "id": 3,
      "name": "saul",
      "email": "saul@example.com",
      "role": "ENGINEER"
    }
  ]

  // filter users based on role, if role is not provided, returns all users
  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): {} {
    if(role){
      const rolesArray = this.users.filter(user => user.role === role) // referes to the private users above
      if(rolesArray.length === 0) throw new NotFoundException(`User Role ${role} not found`)
        return rolesArray; 
    }
    return this.users;
  }

  findOne(id: number): any {
    const user = this.users.find(user => user.id === id);

    if(!user) throw new NotFoundException('User not found');  // if user not found, throw a not found exception
    
    return user;
  }

  create(createUserDto: CreateUserDto)  {

    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    // construct the user to be updated and push it to the users array
    const newUser = {
      id: usersByHighestId[0].id + 1, // just to generate a id
      ...createUserDto
    }
    this.users.push(newUser);
    return newUser;
  }

  // here the updated user is what we receive in the body for the post request
  updateOne(id: number, updateUserDto: UpdateUserDto){
    this.users = this.users.map(user => {
      if(user.id === id){
        return {...user,...updateUserDto} // spread all the users props and merges the props from user and updatedUser
      }
      return user;
    })
    return this.findOne(id) // updates the user above and uses the findOne to find the updated user
  }

  // In RESTful APIs, it's often helpful to return the resource that was deleted, so the client can confirm which specific object was removed
  deleteOne(id: number) {
    const removedUser = this.findOne(id);

    // updates the user array to be an array without the deleted user
    this.users = this.users.filter(user => user.id !== id)
    return removedUser;
  }
}
