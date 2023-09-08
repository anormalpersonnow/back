import { Request, Response } from "express"
import { TopicBusiness } from "../business/TopicBusiness"
import { BaseError } from "../errors/BaseError"
import { ZodError } from "zod"
import { EditTopicSchema } from "../dtos/Topics/editTopic.dto"
import { GetTopicsSchema, GetTopicsByTitleSchema, GetTopicByIdSchema, GetUserTopicsSchema } from "../dtos/Topics/getTopics.dto"
import { CreateTopicSchema } from "../dtos/Topics/createTopic.dto"
import { DeleteTopicSchema } from "../dtos/Topics/deleteTopic.dto"
import { LikeOrDislikePostSchema } from "../dtos/Topics/likeOrDislike.dto"

export class PostController {

  constructor(private topicBusiness: TopicBusiness) { }

  
  public getTopics = async (req: Request, res: Response) => {

    try {
          const input = GetTopicsSchema.parse({
            token: req.headers.authorization
        })

      const output = await this.topicBusiness.getTopics(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }


  public getTopicsByTitle = async (req: Request, res: Response) => {

    try {
          const input = GetTopicsByTitleSchema.parse({
            title: req.body.title,
            token: req.headers.authorization
        })

      const output = await this.topicBusiness.getTopicsByTitle(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public getTopicById = async (req: Request, res: Response) => {

    try {
          const input = GetTopicByIdSchema.parse({
            id: req.params.id,
            token: req.headers.authorization
        })

      const output = await this.topicBusiness.getTopicById(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public getUserTopics = async (req: Request, res: Response) => {

    try {
          const input = GetUserTopicsSchema.parse({
            creatorId: req.params.id,
            token: req.headers.authorization
        })

      const output = await this.topicBusiness.getUserTopics(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }


  public createTopic = async (req: Request, res: Response) => {
    try {
      const input = CreateTopicSchema.parse({
        title: req.body.title,
        content: req.body.content,
        token: req.headers.authorization
      })

      const output = await this.topicBusiness.createTopic(input)

      res.status(201).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  public editTopicByid = async (req: Request, res: Response) => {
    try {

      const input = EditTopicSchema.parse({
        idToEdit: req.params.id,
        title: req.body.title,
        content: req.body.content,
        token: req.headers.authorization
      })

      const output = await this.topicBusiness.editTopic(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }


  public deleteTopicById = async (req: Request, res: Response) => {
    try {
      const input = DeleteTopicSchema.parse({
        idToDelete: req.params.id,
        token: req.headers.authorization
      })

      const output = await this.topicBusiness.deleteTopic(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }

  
  public likeOrDislikeTopic = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikePostSchema.parse({
        id: req.params.id,
        like: req.body.like,
        token: req.headers.authorization
      })

      const output = await this.topicBusiness.likeOrDislikeTopic(input)

      res.status(200).send(output)
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        res.status(400).send(error.issues)
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message)
      } else {
        res.status(500).send("Erro inesperado")
      }
    }
  }
}
