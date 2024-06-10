export class LoginUserDto {
    public email: string;
    public password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public static validate(bodyRequest: any): [string | null, LoginUserDto | null] {
        const { email, password } = bodyRequest;

        if (!password) {
            return ["password is required", null];
        }
        if (!email || email == "") {
            return ["email is required", null];
        }
        if (!this.isEmailValid(email)) {
            return ["email is not valid", null];
        }
        return [null, new LoginUserDto(email, password)];
    }


    public static isEmailValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
