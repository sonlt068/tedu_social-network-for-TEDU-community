import { IsEmail, isEmail, IsNotEmpty, MinLength } from "class-validator";

export default class LoginDto {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  @IsEmail()
  public email: string;
  @IsNotEmpty()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  public password: string;
}
