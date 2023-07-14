//criando nova/adicionando tipagem no typescript
declare namespace Express{
    export interface Request{
        user_id: string;
    }
}