import prismaClient from "../../prisma";

interface ProductRequest{
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService{//quando o execute fr chamado, sera presciso passar os parametros a seguir para funcionar
    async execute({name, price, description, banner, category_id}: ProductRequest){
        //enviando para o banco de dados
        const product = await prismaClient.product.create({
            data:{
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id,
            }
        })

        return product;

    }
}

export { CreateProductService }