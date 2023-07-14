import prismaClient from "../../prisma";

class ListCategoryService{
    async execute(){
        // .findmany -- traz tudo q encontrar -- usando o select ele traz so oque pedirmos
        const category = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true,
            }
        })

        return category;
    }
}

export { ListCategoryService }