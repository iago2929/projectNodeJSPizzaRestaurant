import prismaClient from "../../prisma";

interface ProductRequest{
    category_id: string;
}

 class ListByCategoryService{
    async execute({ category_id }: ProductRequest){

        const findByCategory = await prismaClient.product.findMany({
           //buscar todos os produtos onde o category_id esta apontando
            where:{
                category_id: category_id
            }
        })

        return findByCategory;
    }
 }

 export { ListByCategoryService }