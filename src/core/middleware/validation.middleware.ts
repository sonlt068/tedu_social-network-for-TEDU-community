// don obj co validate du lieu truyen vao
import e, { Request, Response, NextFunction, RequestHandler } from "express";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Logger } from "@core/utils";
import { Http } from "winston/lib/winston/transports";
import { HttpException } from "@core/exceptions";
const validationMisdleware = (
  type: any,
  skipMissingProperties = false,
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const messages = errors
            .map((error: ValidationError) =>
              Object.values(error.constraints || {}),
            )
            .join(",");
          next(new HttpException(400, messages));
        } else {
          next();
        }
      },
    );
  };
};
export default validationMisdleware;
