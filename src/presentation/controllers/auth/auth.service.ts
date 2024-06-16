import { Bscrypt, Jwt } from "../../../core";
import { UserRepository } from "../../../domain/repositories";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

export class AuthService {
    constructor(private readonly userRepository: UserRepository) { }
    public login = async (data: LoginUserDto) => {
        try {
            const user = await this.userRepository.findOne({ email: data.email });
            if (!user) throw 'Credentials does not match in our system';
            const isMatch = await Bscrypt.compare(data.password, user.password);
            if (!isMatch) throw 'Credentials Wrongs';

            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
            }
            const token = user.id ? await Jwt.generate(payload) : null;
            return token;
        } catch (error) {
            throw error;
        }
    }

    public register = async (data: CreateUserDto) => {
        try {
            const createdUSer = await this.userRepository.save({
                name: data.name,
                email: data.email,
                password: await Bscrypt.hash(data.password),
                status: data.status
            });
            const payload = {
                id: createdUSer.id,
                name: createdUSer.name,
                email: createdUSer.email,
            }
            return createdUSer.id ? Jwt.generate(payload) : null;
        } catch (error) {
            throw error;
        }

    }

    public logout = () => {
        return 'logout is runnign';
    }

    public recoverPassword = () => {
        return 'No implemented';
    }

}