import { Injectable } from '@nestjs/common';

interface User{
  id: number,
  username: string,
  email: string,
  role: 'INTERN' | 'ENGINEER' | 'ADMIN'
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      "id": 1,
      "username": "john",
      "email": "john@example.com",
      "role": "ADMIN"
    },
    {
      "id": 2,
      "username": "paul",
      "email": "paul@example.com",
      "role": "INTERN"
    },
    {
      "id": 3,
      "username": "saul",
      "email": "saul@example.com",
      "role": "ENGINEER"
    }
  ]

  // filter users based on role, if role is not provided, returns all users
  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): {} {
    if(role){
      return this.users.filter(user => user.role === role) // referes to the private users above
    }
    return this.users;
  }

  findOne(id: number): any {
    return this.users.find(user => user.id === id);
  }

  create(user: {username: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'})  {

    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    // constructu the user to be updated and push it to the users array
    const newUser = {
      id: usersByHighestId[0].id + 1, // just to generate a id
      ...user
    }
    this.users.push(newUser);
    return newUser;
  }

  // here the updated user is what we receive in the body for the post request
  updateOne(id: number, updatedUser: { username?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN'}){
    this.users = this.users.map(user => {
      if(user.id === id){
        return {...user,...updatedUser} // spread all the users props and merges the props from user and updatedUser
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
