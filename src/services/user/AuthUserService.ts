import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email:string;
    password: string;
}

class AuthUserService{
    async execute({email, password }: AuthRequest){
    //Verificar se o email existe.
    const user = await prismaClient.user.findFirst({
        where:{
            email: email
        }
    })

    if(!user){
        throw new Error("User/password incorrect")
    }

    //É presciso fazer uma verificação vamos analisar se a senha corresponde com a senha cadastradas(mesmo estando criptografada)
    const passwordMatch = await compare(password, user.password)
    // se a senha nao coincidir
    if(!passwordMatch){
        throw new Error("User/password incorrect")  
    }

    //gerar token para o usúario
    const token = sign(
     {
        name: user.name,
        email: user.email
    },
    process.env.JWT_SECRET,
    {
        subject: user.id,
        expiresIn: '30d'
    } 
    )

        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService };