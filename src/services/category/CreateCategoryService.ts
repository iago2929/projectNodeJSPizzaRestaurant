import prismaClient from "../../prisma";

interface CategoryRequest{
    name: string
}

class CreateCategoryService {
    async execute({name}: CategoryRequest){
        //return { ok: true}
        //se name for uma string vazia nao deixar cadastrar
        if(name === ' '){
            throw new Error('Name invalid')    
        }
        //caso contrario 
        //usei o await para esperar nosso prismaClient 
        const category = await prismaClient.category.create({
            data:{
                name: name,
            },//para fornecer oque sera devolvido quando alguem cadastrar uma categoria
            select:{
                id: true,
                name: true,
            }
        })

        return category;
    }
}

export { CreateCategoryService }