import prismaClient from "../../prisma";

class DetailUserService{
    async execute(user_id: string){

        const user = await prismaClient.user.findFirst({
            where:{
               id: user_id
            },
            select:{//envia apenas as selecionadas
                id: true,
                name: true,
                email: true
            }
        })
        return user;
    }
}

export { DetailUserService }