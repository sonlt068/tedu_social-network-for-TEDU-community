import UserSchema from "@modules/users/users.model";
import { HttpException } from "@core/exceptions";
import { isEmptyObject } from "@core/utils";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser, TokenData } from "@modules/auth";
import LoginDto from "./auth.dto";
class AuthService {
  public userSchema = UserSchema;
  public async login(model: LoginDto): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }
    const user: IUser | null = await this.userSchema.findOne({
      email: model.email,
    });
    if (!user) {
      throw new HttpException(404, "User not found");
    }

    const isPasswordMatch = await bcryptjs.compare(
      model.password!,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new HttpException(400, "Createntials are invalid");
    }
    return this.createToken(user);
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
export default AuthService;
