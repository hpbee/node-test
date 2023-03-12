import { NextFunction, Request, Response } from "express";
import { StatusEnum } from "../enums/status.enum";
export const validateRequiredSearchParamsFields = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { query: params } = req;
    if (
        params &&
        params.from &&
        params.to &&
        (
            (params.addressIds && params.addressIds.length && !params.zipCodes) ||
            (params.zipCodes && params.zipCodes.length && !params.addressIds)
        ) &&
        (Object.values(StatusEnum).includes(params.status as StatusEnum) || params.status === '@any')
    ) {
        next();
    } else {
        res.status(400).send({
            error: `Check params`,
        });
    }
}