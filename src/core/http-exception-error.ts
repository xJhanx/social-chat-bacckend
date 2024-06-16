export class HttpException {
    constructor(public readonly error: any, public readonly status: number) { }
}