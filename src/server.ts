import express, { Request, Response, NextFunction} from 'express'
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { router } from './routes';

const app = express();
app.use(express.json());
//estamos abilitando para qualquer ip ou html fazer requisiçoes na nossa api
app.use(cors())

app.use(router);
//para ter acesso a imagem
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
      //se for uma instancia d tipo error
      return res.status(400).json({
        error: err.message
      })  
    }
    //para mostrar uma mensage de errro mais amigavel 500
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(3333, () => console.log('Servidor online'))