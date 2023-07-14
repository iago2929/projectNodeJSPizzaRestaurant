import prismaClient from "../../prisma";

interface OrderRequest{
    order_id: string;
}

class SendOrderService{
    async execute({ order_id }: OrderRequest){

        const order = await prismaClient.order.update({
            where:{
                id: order_id,
            },
            data:{//vai mudar o rascunho draft para falso ou seja nao é mais um racunho
                draft: false
            }
        })

        return order;
    }
}

export { SendOrderService }