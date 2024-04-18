import { error } from "console";
import db from "../db"
import { registervalidation } from "../lib/validation/register"
import { IRegister } from "../type/app";
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { STATUS_CODE } from "../util/constant";

export const getUsers = async () => {
    return await db.user.findMany();
};

export const getUser = async (id: number) => {
    return await db.user.findFirst({
        where: {
            id,
        },
    });
}

export const register = async (payload: IRegister) => {
     const {error, value} = registervalidation.validate(payload);
     if (error) {
        throw new Error(STATUS_CODE.INVALID);
     }

     const isExist = await db.user.findFirst({
        where: {
            OR: [
                {
                    username: value.username,
                },
                {
                    email: value.email,
                }
            ]
        }
     })

     if (isExist) {
        throw new Error ("username or email already exist");
    } 

    const hashedPassword = await bcrypt.hash(value.password, 10);

    value.password = hashedPassword

    const user = await db.user.create({
        data: {
            ...value
        }
    })

    const profile = await db.profile.create({
        data: {
            userId: user.id
        }
    })

    return { user, profile };
}

export const login = async (username: string, password: string): Promise<string> => {
    const user = await db.user.findFirst({
        where: {
            OR: [
                {
                    username, 
                },
                {
                    email: username,
                }
            ]
        }
    })

    if (!user) {
        throw new Error("user or password is not valid");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("user or passwrod is not valid");
    }

    const token = jwt.sign({ id: user.id}, process.env.SECRET_KEY!, {
        expiresIn: "1d",
    })

    return token;
}