import { NextFunction, Request, Response } from "express";

const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader: string = req.headers["authorization"];
    if (typeof bearerHeader == "undefined") {
        res.sendStatus(403);
    } else {
        const bearer: string[] = bearerHeader.split(" ");
        const token: string = bearer[1];
        req.token = token;
        next();
    }
};
export default VerifyToken;
