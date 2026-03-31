import RegisterDto from "./dtos/register.dto";
import UserSchema from "./users.model";
import { HttpException } from "@core/exceptions";
import { isEmptyObject } from "@core/utils";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import IUser from "./users.interface";
import jwt from "jsonwebtoken";
import { TokenData } from "@modules/auth";
class UserService {
  public userSchema = UserSchema;
  public async createUser(model: RegisterDto): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }
    const user = await this.userSchema.findOne({ email: model.email });
    if (user) {
      throw new HttpException(409, "Email already exists");
    }
    const avatar = gravatar.url(model.email!, { s: "200", r: "pg", d: "mm" });
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(model.password!, salt);
    const createUser = await this.userSchema.create({
      first_name: model.first_name,
      last_name: model.last_name,
      email: model.email,
      password: hashedPassword,
      avatar,
      date: Date.now(),
    });
    return this.createToken(createUser);
  }
  private createToken(user: IUser): TokenData {
    const dataStoreInToken = { id: user._id };
    const secretKey = process.env.JWT_SECRET_KEY as string;
    const expiresIn = 60 * 60; // 1 hour
    return {
      token: jwt.sign(dataStoreInToken, secretKey, { expiresIn: expiresIn }),
    };
  }
}
export default UserService;
