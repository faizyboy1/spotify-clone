import { Module, NestMiddleware, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: any, res: any, next: (error?: any) => void) {
        console.log("Request ....", new  Date().toDateString());
        next();
    }
}
