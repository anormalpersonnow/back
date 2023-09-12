import { Request, Response } from "express"
import { CommentBusiness } from "../business/CommentBusiness"
import { BaseError } from "../errors/BaseError"
import { ZodError } from "zod"
import { EditCommentSchema } from "../dtos/Comments/editComment.dto"
import { GetCommentsSchema, GetCommentsByContentSchema, GetCommentByIdSchema, GetUserCommentsSchema } from "../dtos/Comments/getComments.dto"
import { CreateCommentSchema } from "../dtos/Comments/createComment.dto"
import { DeleteCommentSchema } from "../dtos/Comments/deleteComment.dto"
import { LikeOrDislikeCommentSchema } from "../dtos/Comments/likeOrDislike.dto"

export class CommentController {

  constructor(private commentBusiness: CommentBusiness) { }

  
  public getComments = async (req: Request, res: Response) => {

    try {
          const input = GetCommentsSchema.parse({
            token: req.headers.authorization
        })

      const output = await this.commentBusiness.getComments(input)

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


  public getCommentsByContent= async (req: Request, res: Response) => {

    try {
          const input = GetCommentsByContentSchema.parse({
            title: req.body.title,
            token: req.headers.authorization
        })

      const output = await this.commentBusiness.getCommentsByContent(input)

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

  public getCommentById = async (req: Request, res: Response) => {

    try {
          const input = GetCommentByIdSchema.parse({
            id: req.params.id,
            token: req.headers.authorization
        })

      const output = await this.commentBusiness.getCommentById(input)

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

  public getUserComments = async (req: Request, res: Response) => {

    try {
          const input = GetUserCommentsSchema.parse({
            creatorId: req.params.id,
            token: req.headers.authorization
        })

      const output = await this.commentBusiness.getUserComments(input)

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


  public createComment = async (req: Request, res: Response) => {
    try {
      const input = CreateCommentSchema.parse({
        title: req.body.title,
        content: req.body.content,
        token: req.headers.authorization
      })

      const output = await this.commentBusiness.createComment(input)

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

  public editCommentByid = async (req: Request, res: Response) => {
    try {

      const input = EditCommentSchema.parse({
        idToEdit: req.params.id,
        title: req.body.title,
        content: req.body.content,
        token: req.headers.authorization
      })

      const output = await this.commentBusiness.editComment(input)

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


  public deleteCommentById = async (req: Request, res: Response) => {
    try {
      const input = DeleteCommentSchema.parse({
        idToDelete: req.params.id,
        token: req.headers.authorization
      })

      const output = await this.commentBusiness.deleteComment(input)

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

  
  public likeOrDislikeComment = async (req: Request, res: Response) => {
    try {
      const input = LikeOrDislikeCommentSchema.parse({
        id: req.params.id,
        like: req.body.like,
        token: req.headers.authorization
      })

      const output = await this.commentBusiness.likeOrDislikeComment(input)

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
