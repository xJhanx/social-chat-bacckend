export class CreateUserDto {
    public name: string;
    public email: string;
    public password: string;
    public status : boolean;

    constructor(name: string, email: string,status: boolean, password: string) {
        this.name = name;
        this.email = email;
        this.status = status;
        this.password = password;
    }

    public static validate(bodyRequest :any): [string | null, CreateUserDto | null] {
        const { name, email, password,status } = bodyRequest;
        let status_default = true;
        if (!name || name == "") {
            return ["name is required", null];
        }
        if (!password) {
            return ["password is required", null];
        }
        if (!email || email == "") {
            return ["email is required", null];
        }
        if(status) {
            status_default = status;
        }
        if (!this.isEmailValid(email)) {
            return ["email is not valid", null];
        }
        return [null, new CreateUserDto(name, email,status_default, password)];
    }


    public static isEmailValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}