import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types";

// Basically this is the same as CreateUserDto but the fields are optional instead of having to create a variant of the CreateUserDto we extend it to use with fields that can be optinal in the CreateUserDto. 
export class UpdateUserDto extends PartialType(CreateUserDto){ }