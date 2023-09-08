import z from "zod"
import { TopicModel } from "../../models/Topic"

export interface GetTopicsInputDTO {
  token: string 
}

export interface GetTopicsByTitleInputDTO {
  title: string,
  token: string 
}

export interface GetTopicByIdInputDTO {
  id: string,
  token: string 
}

export interface GetUserTopicsInputDTO {
  creatorId: string,
  token: string 
}

export const GetTopicsSchema = z.object({
  token: z.string().min(1)
}).transform(data => data as GetTopicsInputDTO)


export const GetTopicsByTitleSchema = z.object({
  title: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as GetTopicsByTitleInputDTO)


export const GetTopicByIdSchema = z.object({
  id: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as GetTopicByIdInputDTO)


export const GetUserTopicsSchema = z.object({
  creatorId: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as GetUserTopicsInputDTO)

export type GetTopicsOutputDTO = TopicModel[]
export type GetSingleTopicOutputDTO = TopicModel
export type GetUserTopicsOutputDTO = TopicModel[]
