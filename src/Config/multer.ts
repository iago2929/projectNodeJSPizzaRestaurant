import crypto from 'crypto';
import { request } from 'express';
import multer from "multer";

import {extname, resolve} from 'path'

export default{
    upload(folder: string){
        return{
            storage: multer.diskStorage({
              destination: resolve(__dirname, '..', '..', folder),
              filename: (request, file, callback) => {
                const fileHash = crypto.randomBytes(16).toString("hex");
                const fileName = `${fileHash}-${file.originalname}`//sera composto pelo hash mais o nome original

                return callback(null, fileName)
              }  
            })
        }
    }
}