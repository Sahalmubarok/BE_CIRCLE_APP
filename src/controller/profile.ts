import { Request, Response } from "express"
import * as profileServices from "../service/profile"

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user
        const { body } = req
        const files = req.files as { [fieldname: string ]: Express.Multer.File[]}
        const cover = files.cover[0].filename
        const avatar = files.avatar[0].filename

        if (cover) {
            body.cover = cover;
        }

        if (avatar) {
            body.avatar = avatar;
        }

        await profileServices.updateProfile(userId, body)

        res.json({
            status: true,
            message: "succes",
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

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user

        const profile = await profileServices.getProfile(userId);

        res.json({
            status: true,
            message: "succes",
            data: profile,
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

export const getProfileById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const profile = await profileServices.getProfile(+id);
        
        res.json({
            status: true,
            message: "haha",
            data: profile,
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