
import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';

// this is basically a way of creating a type or a interface so we dont have to write the entire type all the time.
// IsEmail... are all provided methods from class-validator.
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(["INTERN", "ENGINEER", "ADMIN"], {
    message: "Role must be either INTERN, ENGINEER or ADMIN"
  })
  role: "INTERN" | "ENGINEER" | "ADMIN"
}
