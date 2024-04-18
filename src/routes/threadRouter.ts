import { Router } from "express";
import authentication from "../middleware/authentication";
import uploadMiddleware from "../middleware/upload"
import { getThread, getThreads, createThread, getReplies} from "../controller/thread";

const threadRouter = Router();

threadRouter.post(
    "/thread", 
    authentication, 
    uploadMiddleware("cover"), 
    createThread);

threadRouter.get("/threads", authentication, getThreads)
threadRouter.post("/thread/:id", authentication, getThread)
threadRouter.get("/replies/:id", authentication, getReplies)

export default threadRouter;