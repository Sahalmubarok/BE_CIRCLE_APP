import { RecordWithTtl } from "dns";
import * as threadServices from "../service/thread"
import { Request, Response } from "express";

export const getThreads = async (req: Request, res: Response) => {
    try {
        const threads = await threadServices.getThreads();

        res.json({
            status: true,
            message: "succes",
            data: threads
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

export const getThread = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const thread = await threadServices.getThread(+id);

        res.json({
            status: true,
            message: "succes",
            data: thread,
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

export const createThread = async (req: Request, res: Response) => {
    try {
        const { body } = req;
        body.userId = res.locals.user;
        const thread = await threadServices.createThread(
            body,
            req.files as { [fieldname: string]: Express.Multer.File[] }
        );
        
        res.json({
            status: true,
            message: "succes",
            data: thread,
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

export const getReplies = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const replies = await threadServices.getReplies(+id);

        res.json({
            status: true,
            message: "succes",
            data: replies,
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