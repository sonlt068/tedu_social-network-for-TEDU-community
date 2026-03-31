import { Request,Response,NextFunction } from "express";
import {HttpException} from "@core/exceptions"; 
import { Logger } from "@core/utils";

const errorMiddleware = (
    error:HttpException, 
    req:Request, 
    res:Response, 
    next:NextFunction
) => {    
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    Logger.error(`Error: ${message}, Status Code: ${status}`);
    res.status(status).json({message:message});
}
export default errorMiddleware;