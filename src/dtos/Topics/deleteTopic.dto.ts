import z from 'zod'

export interface DeleteTopicInputDTO {
    idToDelete: string,
    token: string
}

export interface DeleteTopicOutputDTO {
    message: string;
}

export const DeleteTopicSchema = z.object({
    idToDelete: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as DeleteTopicInputDTO)