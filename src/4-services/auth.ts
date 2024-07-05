import { cyber } from "../2-utils/cyber";
import { ModelValidation, ValidationError } from "../3-models/client-errors";
import { IUserModel, UserModel } from "../3-models/user";

class AuthService {

    public async register(user: IUserModel): Promise<IUserModel> {
        ModelValidation.validateSync(user);
        if (await UserModel.exists({ email: user.email }).exec()) throw new ValidationError(`email ${user.email} already exist.`);
        if (await UserModel.exists({ username: user.username }).exec()) throw new ValidationError(`username ${user.username} already exist.`);
        user.password = cyber.hash(user.password);
        return await user.save();
    }
}

export const authService = new AuthService();
