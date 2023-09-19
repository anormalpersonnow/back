import { Comment, CommentDB } from "../models/Comment"
import { CommentDatabase } from "../database/CommentDataBase"
import { COMMENT_LIKE, LikeOrDislikeDB } from "../models/LikeComment"
import { NotFoundError } from "../errors/NotFoundError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"
import { USER_ROLES } from "../models/User"
import { EditCommentInputDTO, EditCommentOutputDTO } from "../dtos/Comments/editComment.dto"
import {GetCommentsInputDTO, GetCommentsOutputDTO} from "../dtos/Comments/getComments.dto"
import { CreateCommentInputDTO, CreateCommentOutputDTO } from "../dtos/Comments/createComment.dto"
import { DeleteCommentInputDTO, DeleteCommentOutputDTO } from "../dtos/Comments/deleteComment.dto"
import { LikeOrDislikeCommentInputDTO, LikeOrDislikeCommentOutputDTO } from "../dtos/Comments/likeOrDislike.dto"


export class CommentBusiness {

  constructor(
    private CommentDatabase: CommentDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) { }


  public getComments = async (
    input: GetCommentsInputDTO
  ): Promise<GetCommentsOutputDTO> => {

    const { content, token } = input
    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new UnauthorizedError("Token inválido")
    }

    let CommentsDB = await this.CommentDatabase.findComments(content)

    const Comments = CommentsDB
      .map((CommentWithCreator) => {
        const comment = new Comment(
          CommentWithCreator.id,
          CommentWithCreator.content,
          CommentWithCreator.likes,
          CommentWithCreator.dislikes,
          CommentWithCreator.created_at,
          CommentWithCreator.updated_at,
          CommentWithCreator.creator_id,
          CommentWithCreator.creator_username
        )

        return comment.toBusinessModel()
      })

    const output: GetCommentsOutputDTO = Comments
    return output
  }

  public createComment = async (
    input: CreateCommentInputDTO
  ): Promise<CreateCommentOutputDTO> => {

    const { content, token } = input

    const id = this.idGenerator.generate()
    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new UnauthorizedError("Token inválido")
    }

    const newComment = new Comment(
      id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.username
    )

    const newCommentDB: CommentDB = {
      id: newComment.getId(),
      creator_id: newComment.getCreatorId(),
      content: newComment.getContent(),
      likes: newComment.getLikes(),
      dislikes: newComment.getDislikes(),
      created_at: newComment.getCreatedAt(),
      updated_at: newComment.getUpdatedAt(),
    }

    await this.CommentDatabase.insertComment(newCommentDB)

    const output = undefined

    return output
  }

  public editComment = async (
    input: EditCommentInputDTO
  ): Promise<EditCommentOutputDTO> => {

    const {
      idToEdit,
      content,
      token
    } = input

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new UnauthorizedError("Token inválido")
    }

    if (!idToEdit) {
      throw new NotFoundError("Por favor, insira um id")
    }

    const CommentToEditDB = await this.CommentDatabase.findCommentById(idToEdit)

    if (!CommentToEditDB) {
      throw new NotFoundError("Comentário com suposto id não encontrado, insira um id válido")
    }

    const comment = new Comment(
      CommentToEditDB.id,
      CommentToEditDB.content,
      CommentToEditDB.likes,
      CommentToEditDB.dislikes,
      CommentToEditDB.created_at,
      new Date().toISOString(),
      CommentToEditDB.creator_id,
      CommentToEditDB.creator_username
    )


    content && comment.setContent(content)

    const updateCommentDB: CommentDB = {
      id: comment.getId(),
      creator_id: comment.getCreatorId(),
      content: comment.getContent(),
      likes: comment.getLikes(),
      dislikes: comment.getDislikes(),
      created_at: comment.getCreatedAt(),
      updated_at: comment.getUpdatedAt()
    }

    if (payload.role === USER_ROLES.ADMIN) {
      await this.CommentDatabase.updateCommentById(idToEdit, updateCommentDB)
    } else if (CommentToEditDB.creator_id === payload.id) {
      await this.CommentDatabase.updateCommentById(idToEdit, updateCommentDB)
    } else {
      throw new UnauthorizedError("Somente o administrador ou dono da postagem podem acessar este recurso.")
    }

    const output = {
      content: comment.getContent()
    }

    return output

  }

  public deleteComment = async (
    input: DeleteCommentInputDTO
  ): Promise<DeleteCommentOutputDTO> => {

    const { idToDelete, token } = input

    const CommentToDeleteDB = await this.CommentDatabase.findCommentById(idToDelete)
    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new UnauthorizedError("Token inválido")
    }

    if (!idToDelete) {
      throw new NotFoundError("Por favor, insira um id")
    }

    if (!CommentToDeleteDB) {
      throw new NotFoundError("'ID' não encontrado")
    }

    if (payload.role === USER_ROLES.ADMIN) {
      await this.CommentDatabase.deleteCommentById(idToDelete)
    } else if (CommentToDeleteDB.creator_id === payload.id) {
      await this.CommentDatabase.deleteCommentById(idToDelete)
    } else {
      throw new UnauthorizedError("Somente o administrador ou dono do tópico podem acessar este recurso.")
    }


    const output = {
      message: "Comentário deletado com sucesso",
    }
    return output
  }

  public likeOrDislikeComment = async (
    input: LikeOrDislikeCommentInputDTO
  ): Promise<LikeOrDislikeCommentOutputDTO> => {

    const { commentId, like, token } = input

    const payload = this.tokenManager.getPayload(token)

    if (payload === null) {
      throw new UnauthorizedError("Token inválido")
    }

    const CommentDBwithCreator = await this.CommentDatabase.findCommentById(commentId)

    if (!CommentDBwithCreator) {
      throw new NotFoundError("Comentário não encontrado")
    }

    const comment = new Comment(
      CommentDBwithCreator.id,
      CommentDBwithCreator.content,
      CommentDBwithCreator.likes,
      CommentDBwithCreator.dislikes,
      CommentDBwithCreator.created_at,
      CommentDBwithCreator.updated_at,
      CommentDBwithCreator.creator_id,
      CommentDBwithCreator.creator_username,
    )

    const likeSQL = like ? 1 : 0

    const likeDislikeDB: LikeOrDislikeDB = {
      user_id: payload.id,
      comment_id: commentId,
      like: likeSQL
    }

    const likeDislikeExists = await this.CommentDatabase.findLikeOrDislike(likeDislikeDB)

    if (likeDislikeExists === COMMENT_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.CommentDatabase.deleteLikeOrDislike(likeDislikeDB)
        comment.removeLike()
      } else {
        await this.CommentDatabase.updateLikeOrDislike(likeDislikeDB)
        comment.removeLike()
        comment.addDislike()
      }

    } else if (likeDislikeExists === COMMENT_LIKE.ALREADY_DISLIKED) {
      if (like === false) {
        await this.CommentDatabase.deleteLikeOrDislike(likeDislikeDB)
        comment.removeDislike()
      } else {
        await this.CommentDatabase.updateLikeOrDislike(likeDislikeDB)
        comment.removeDislike()
        comment.addLike()
      }

    } else {
      await this.CommentDatabase.insertLikeOrDislike(likeDislikeDB)
      like ? comment.addLike() : comment.addDislike()
    }

    const updatedCommentDB = comment.toDBModel()
    await this.CommentDatabase.updateCommentById(updatedCommentDB.id, updatedCommentDB)

    const output: LikeOrDislikeCommentOutputDTO = {
      likes: comment.getLikes(),
      dislikes: comment.getDislikes()
    }

    return output
  }
}