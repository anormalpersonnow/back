import z from 'zod'

export interface EditTopicInputDTO {
    idToEdit: string,
    title: string,
    content: string,
    token: string
}

export interface EditTopicOutputDTO {
    title: string,
    content: string
}
export const EditTopicSchema = z.object({
    idToEdit: z.string().min(1),
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    token: z.string().min(1)
}).transform(data => data as EditTopicInputDTO)