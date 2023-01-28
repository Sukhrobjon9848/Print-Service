import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDto } from "./dto/login-dto";
import { RegisterDto } from "./dto/register-dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() registerData: RegisterDto) {
        try {
            const user = await this.authService.registerUser(registerData)
            console.log(user);

            return user
        } catch (error) {
            return error.message
        }
    }

    @Post('login')
    async login(@Body() loginData: loginDto) {

        const user = await this.authService.login(loginData)
        return user

    }
    @Get('user')
    getUser() {
        return this.authService.getUser()
    }

}
console.log(process.env.DB);
