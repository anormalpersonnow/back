import express from "express"
import { PostBusiness } from "../business/PostBusiness"
import { PostController } from "../controller/PostController"
import { PostDatabase } from "../database/PostDataBase"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"

export const topicRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

topicRouter.get("/", postController.getPosts)
topicRouter.post("/", postController.createPost)
topicRouter.put("/:id", postController.editPostById)
topicRouter.put("/:id/like", postController.likeOrDislikePost)
topicRouter.delete("/:id", postController.deletePostById)
