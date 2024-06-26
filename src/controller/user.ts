import { Request, Response } from "express"
import * as userService from "../service/user"

export const register = async (req: Request, res: Response) => {
    try {
        const { body } = req;

        const result = await userService.register(body);

        res.json({
            status: true,
            message: "succes",
        });
    } catch (error) {
        const err = error as unknown as Error;

        if (err.message === "username or email already exist") {
            res.status(400).json({
                status: false,
                message: err.message,
            })
        }

        res.status(500).json({
            status: false,
            message: err.message,
        })
    }
}

export const Login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const token = await userService.login(username, password);

        res.json({
            status: true,
            message: "succes",
            data: token,
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

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.getUsers();

        res.json({
            status: true,
            message: "succes",
            data: users,
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