import jwt from 'jsonwebtoken';
import { envs } from '../config';

export class Jwt {
    static generate(payload: any) {
        try {
            return jwt.sign(payload, envs.SECRET_KEY_TOKEN, { expiresIn: '1h' });
        } catch (error) {
            throw error;
        }
    }

    static verify(token: string) : [boolean, any] {
        try {
            if (!token) return [false, null];
            const result = jwt.verify(token, envs.SECRET_KEY_TOKEN);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    }

}