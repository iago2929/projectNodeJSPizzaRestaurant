import prismaClient from '../../prisma'
import { hash } from 'bcryptjs';

interface UserRequest{
  name: string;
  email: string;
  password: string;
}

class CreateUserService{
  async execute({ name, email, password }: UserRequest){

    // verificar se ele enviou um email
    if(!email){
      throw new Error("Email incorrect")
    }

    //Verificar se esse email já está cadastrado na plataforma
    const userAlreadyExists = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    if(userAlreadyExists){
      throw new Error("User already exists")
    }
    //criptografando senha "password"
    const passwordHash = await hash (password, 8 )

    const user = await prismaClient.user.create({
      data:{
        name: name,
        email: email,
        password: passwordHash,//assim a senha fica criptografada no servidor
        //password: password, desta forma fica visivel no servidor a senha criada pelo usuario
      },
      select:{
        id: true,
        name: true,       
        email: true,
      }
    })


    return user;
  }
}

export { CreateUserService }