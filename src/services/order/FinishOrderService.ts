import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string;
}

class FinishOrderService{
    async execute({ order_id }: OrderRequest){
        
        const order = await prismaClient.order.update({
            where:{
                id: order_id
            },
            data:{//ira mudar de false para true dentro do banco
                status: true,
            }
        })

        return order;

    }

}

export { FinishOrderService }