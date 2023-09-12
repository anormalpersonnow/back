import z from "zod"
import { CommentModel } from "../../models/Comment"

export interface GetCommentsInputDTO {
  token: string 
}

export interface GetCommentsByContentInputDTO {
  content: string,
  token: string 
}

export interface GetCommentByIdInputDTO {
  id: string,
  token: string 
}

export interface GetUserCommentsInputDTO {
  creatorId: string,
  token: string 
}

export const GetCommentsSchema = z.object({
  token: z.string().min(1)
}).transform(data => data as GetCommentsInputDTO)


export const GetCommentsByContentSchema = z.object({
  content: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as GetCommentsByContentInputDTO)


export const GetCommentByIdSchema = z.object({
  id: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as GetCommentByIdInputDTO)


export const GetUserCommentsSchema = z.object({
  creatorId: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as GetUserCommentsInputDTO)

export type GetCommentsOutputDTO = CommentModel[]
export type GetSingleCommentOutputDTO = CommentModel
export type GetUserCommentsOutputDTO = CommentModel[]
