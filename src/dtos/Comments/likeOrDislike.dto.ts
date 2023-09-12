import z from 'zod'

export interface LikeOrDislikeCommentInputDTO {
    commentId: string,
    like: boolean,
    token: string
}

export type LikeOrDislikeCommentOutputDTO = undefined

export const LikeOrDislikeCommentSchema = z.object({
    commentId: z.string().min(1),
    like: z.boolean(),
    token: z.string().min(1)
}).transform(data => data as LikeOrDislikeCommentInputDTO)

