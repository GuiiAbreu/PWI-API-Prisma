import {json, NextFunction, Request, Response} from "express";
import prisma from "../database/db";

async function checkExistsUserAccount(req:Request, res:Response, next:NextFunction) {
    const {username}: {username: string} = req.headers as {username: string};

    try {
        const user = await prisma.user.findUnique({
            where: {username}
        });

        if (!user) {
            return res.status(404).json({error: "user not found"});
        }

        next();
    } catch (error) {
        return res.status(500).json({error: "Internal Server Error"});
    }
}
export default checkExistsUserAccount