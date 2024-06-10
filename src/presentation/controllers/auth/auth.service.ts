import { Bscrypt } from "../../../core";
import { UserRepository } from "../../../domain/repositories";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

export class AuthService {

    public login = async (data: LoginUserDto) => {
        try {
            const user = await UserRepository.findOne({ email: data.email });
            if (!user) throw 'Credentials does not match in our system';

            const isMatch = await Bscrypt.compare(data.password, user.password);
            if (!isMatch) throw 'Credentials Wrongs';

            // TODO: return token 
            return user;

        } catch (error) {
            throw error;
        }
    }

    public register = async (data: CreateUserDto) => {
        try {
            const user = new UserRepository({
                name: data.name,
                email: data.email,
                password: await Bscrypt.hash(data.password),
                status: data.status
            });
            const repsonse = await user.save();
            //TODO : return token

            return repsonse;
        } catch (error) {
            throw error;
        }

    }

    public logout = () => {
        return 'logout is runnign';
    }

    public recoverPassword = () => {
        return 'recoverPassword is runnign';
    }

}