import {scrypt, randomBytes} from 'crypto'
import {promisify} from 'util'

const asycnScript = promisify(scrypt)
export class Password  {

    static async toHash (password : string) {
        const salt = randomBytes(8).toString("hex")
        const buf = (await asycnScript(password, salt, 64)) as Buffer
        
        return `${buf.toString('hex')}.${salt}`
    }


    static async compare (storedPassword : string, suppliedPassword : string){
        const [hasedPassword,salt] = storedPassword.split('.')

        const buf = (await asycnScript(suppliedPassword, salt, 64)) as Buffer

        return buf.toString('hex') === hasedPassword


    }
}