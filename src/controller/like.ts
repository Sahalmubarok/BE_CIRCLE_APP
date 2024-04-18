import db from "../db"
import { Request, Response } from "express";
import * as likeServices from "../service/like"

export const getLikes = async (req: Request, res: Response) => {
    try {
        const  {threadId} = req.params;
        const likes = await likeServices.getLikes(+threadId);

        res.json({
            status: true,
            message: "succes",
            data: {
                user: likes
            }
        })
    } catch (error) {
        const err = error as unknown as Error;
        console.log(err);

        res.status(500).json({
            status: false,
            message: err.message,
        })
    }
}

export const createLike = async (req: Request, res: Response) => {
    try {
        const { threadId } = req.body;
        const userId = res.locals.user;
        const like = await likeServices.createLike({
            threadId,
            userId,
        })

        res.json({
            status: true,
            message: "like succes"
        })
    } catch (error) {
        const err = error as unknown as Error;
        console.log(err);

        res.status(500).json({
            status: false,
            message: err.message
        })
        
    }
}