import * as bcrypt from "bcrypt"
export async function hashpassword(password: string): Promise<string> {
    const SALT = bcrypt.genSaltSync()
    const hashpass = bcrypt.hash(password, SALT)
    return hashpass
}



export async function deCodedPass(password: string, hash: string): Promise<boolean> {
    const cheackPass = bcrypt.compare(password, hash)
    return cheackPass
}