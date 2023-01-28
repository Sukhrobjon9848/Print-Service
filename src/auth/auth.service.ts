import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Config } from "prettier";
import { deCodedPass, hashpassword } from "src/utils/password-hash";
import { loginDto } from "./dto/login-dto";
import { RegisterDto } from "./dto/register-dto";
import { User, UserDocument } from "./schemas/auth.schema";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private authModel: Model<UserDocument>, private readonly configService: ConfigService) { }

    async registerUser(regsiterData: RegisterDto) {
        const { userName, email, password } = regsiterData
        const founfUser = await this.authModel.findOne({ email: email })
        if (founfUser) {
            throw new HttpException("Alread exsisted", HttpStatus.FOUND)
        }
        const Password = await hashpassword(password)
        return this.authModel.create({ userName, email, password: Password })
    }

    async login(loginData: loginDto) {
        let userData = await this.authModel.findOne({ email: loginData.email })
        const decode = await deCodedPass(loginData.password, userData.password)
        if (userData) {
            if (decode) {
                throw new HttpException("ok", HttpStatus.OK)
            }
            throw new HttpException("Password invalid", HttpStatus.BAD_REQUEST)
        }
        throw new HttpException("NotFound", HttpStatus.NOT_FOUND)

    }
    getUser() {
        return this.authModel.find()
    }
}