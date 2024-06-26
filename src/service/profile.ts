import db from "../db"
import { IProfile } from "../type/app"

export const updateProfile = async (userId: number, payload: IProfile) => {
     
    return await db.profile.update({
        where: {
            userId,
        },
        data: {
            ...payload
        }
    })
}

export const getProfile = async (userId: number) => {
    return await db.profile.findFirst({
        where: {
            userId,
        }
    })
}