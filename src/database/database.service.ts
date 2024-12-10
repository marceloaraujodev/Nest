import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// implementes means to call the class OnModuleInit automatically when module is loaded
@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit{
  async onModuleInit() {
    console.log('Initializing DatabaseService...');
    try {
      await this.$connect(); // connects to prisma db
      console.log('Database intitialized successfully');
    } catch (error) {
      console.log(error, error.message)
    }
  }
}
