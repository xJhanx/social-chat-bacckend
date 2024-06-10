import bcrypt from 'bcryptjs';

export class Bscrypt {

    public static hash(password: string) {
        return bcrypt.hashSync(password, 10);
    }
      
    public static compare(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
    }
}