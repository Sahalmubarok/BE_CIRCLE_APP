import { threadId } from "worker_threads"
import db from "../db"

export const getReplies = async (threadId: number) => {
    return await db.thread.findMany({
        where: {
            threadId,
        },
        include: {
            image: {
                select: {
                    image: true,
                }
            },
            _count: {
                select: {
                    replies: true,
                }
            }
        }
    })
}

