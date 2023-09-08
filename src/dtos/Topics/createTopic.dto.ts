import z from "zod"

export interface CreateTopicInputDTO {
    title: string,
    content: string,
    token: string
}

export type CreateTopicOutputDTO = undefined

export const CreateTopicSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as CreateTopicInputDTO)