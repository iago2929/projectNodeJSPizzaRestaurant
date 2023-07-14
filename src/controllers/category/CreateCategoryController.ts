import { Request, Response } from 'express'
import { CreateCategoryService } from "../../services/category/CreateCategoryService";

class CreateCategoryController{
    async handle(req: Request, res: Response){
        //quando o user for cadastrar um category ele ira mandar atraves do corpo da requisição
        const { name } = req.body;
        //esperace uma propriedade name, ela sera mandada no corpo da requisição[body]

        const createCategoryService = new CreateCategoryService();

        const category = await createCategoryService.execute({
            name
        });

        return res.json(category);
    }
}

export { CreateCategoryController }