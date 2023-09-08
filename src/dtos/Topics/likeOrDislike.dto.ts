import z from 'zod'

export interface LikeOrDislikeTopicInputDTO {
    topicId: string,
    like: boolean,
    token: string
}

export type LikeOrDislikeTopicOutputDTO = undefined

export const LikeOrDislikePostSchema = z.object({
    topicId: z.string().min(1),
    like: z.boolean(),
    token: z.string().min(1)
}).transform(data => data as LikeOrDislikeTopicInputDTO)

