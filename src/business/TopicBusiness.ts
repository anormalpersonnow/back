import { Topic, TopicDB } from "../models/Topic"
import { TOPIC_LIKE, LikeOrDislikeDB } from "../models/LikeTopic"
import { NotFoundError } from "../errors/NotFoundError"
import { UnauthorizedError } from "../errors/UnauthorizedError"
import { IdGenerator } from "../services/idGenerator"
import { TokenManager } from "../services/TokenManager"
import { USER_ROLES } from "../models/User"
import { EditTopicInputDTO, EditTopicOutputDTO } from "../dtos/Topics/editTopic.dto"
import {
  GetTopicsInputDTO, GetTopicsByTitleInputDTO, GetTopicByIdInputDTO, GetSingleTopicOutputDTO,
  GetTopicsOutputDTO, GetUserTopicsInputDTO, GetUserTopicsOutputDTO,
} from "../dtos/Topics/getTopics.dto"
import { CreateTopicInputDTO, CreateTopicOutputDTO } from "../dtos/Topics/createTopic.dto"
import { DeleteTopicInputDTO, DeleteTopicOutputDTO } from "../dtos/Topics/deleteTopic.dto"
import { LikeOrDislikeTopicInputDTO, LikeOrDislikeTopicOutputDTO } from "../dtos/Topics/likeOrDislike.dto"
import { TopicDatabase } from "../database/TopicDataBase"

export class TopicBusiness {

  constructor(
    private topicDatabase: TopicDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager
  ) { }


  public createTopic = async (
    input: CreateTopicInputDTO
  ): Promise<CreateTopicOutputDTO> => {

    const { title, content, token } = input

    const id = this.idGenerator.generate()
    const payload = this.tokenManager.getPayload(token)

    if (!payload || payload === null) {
      throw new UnauthorizedError()
    }

    const newTopic = new Topic(
      id,
      title,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.username
    )

    const newTopicDB: TopicDB = {
      id: newTopic.getId(),
      title: newTopic.getTitle(),
      creator_id: newTopic.getCreatorId(),
      content: newTopic.getContent(),
      likes: newTopic.getLikes(),
      dislikes: newTopic.getDislikes(),
      created_at: newTopic.getCreatedAt(),
      updated_at: newTopic.getUpdatedAt(),
    }

    await this.topicDatabase.createTopic(newTopicDB)

    const output = undefined

    return output
  }

  public getTopics = async (
    input: GetTopicsInputDTO
  ): Promise<GetTopicsOutputDTO> => {

    const { token } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload) {
      throw new UnauthorizedError()
    }

    const topicsDB = await this.topicDatabase.getTopics()

    const topics = topicsDB
      .map((topicWithCreator) => {
        const topic = new Topic(
          topicWithCreator.id,
          topicWithCreator.title,
          topicWithCreator.content,
          topicWithCreator.likes,
          topicWithCreator.dislikes,
          topicWithCreator.created_at,
          topicWithCreator.updated_at,
          topicWithCreator.creator_id,
          topicWithCreator.creator_username
        )

        return topic.toBusinessModel()
      })

    const output: GetTopicsOutputDTO = topics
    return output
  }

  public getTopicsByTitle = async (
    input: GetTopicsByTitleInputDTO
  ): Promise<GetTopicsOutputDTO> => {

    const { title, token } = input

    const payload = this.tokenManager.getPayload(token)
    const postsDB = await this.topicDatabase.findTopicByTitle(title)

    if (!payload || payload === null) {
      throw new UnauthorizedError()
    }

    const topics = postsDB
      .map((topicWithCreator) => {
        const topic = new Topic(
          topicWithCreator.id,
          topicWithCreator.title,
          topicWithCreator.content,
          topicWithCreator.likes,
          topicWithCreator.dislikes,
          topicWithCreator.created_at,
          topicWithCreator.updated_at,
          topicWithCreator.creator_id,
          topicWithCreator.creator_username
        )
        return topic.toBusinessModel()
      })

    const output: GetTopicsOutputDTO = topics
    return output
  }

  public getUserTopics = async (
    input: GetUserTopicsInputDTO
  ): Promise<GetUserTopicsOutputDTO> => {

    const { creatorId, token } = input

    const payload = this.tokenManager.getPayload(token)
    const topicsDB = await this.topicDatabase.findUserTopics(creatorId)

    if (!payload || payload === null) {
      throw new UnauthorizedError()
    }

    const topics = topicsDB
      .map((topicWithCreator) => {
        const topic = new Topic(
          topicWithCreator.id,
          topicWithCreator.title,
          topicWithCreator.content,
          topicWithCreator.likes,
          topicWithCreator.dislikes,
          topicWithCreator.created_at,
          topicWithCreator.updated_at,
          topicWithCreator.creator_id,
          topicWithCreator.creator_username
        )
        return topic.toBusinessModel()
      })

    const output: GetTopicsOutputDTO = topics
    return output
  }

  public getTopicById = async (
    input: GetTopicByIdInputDTO
  ): Promise<GetSingleTopicOutputDTO> => {

    const { id, token } = input

    const payload = this.tokenManager.getPayload(token)
    const topicDB = await this.topicDatabase.findTopicById(id)

    if (!payload || payload === null) {
      throw new UnauthorizedError()
    }

    const topic = new Topic(
      topicDB.id,
      topicDB.title,
      topicDB.content,
      topicDB.likes,
      topicDB.dislikes,
      topicDB.created_at,
      topicDB.updated_at,
      topicDB.creator_id,
      topicDB.creator_username
    )

    return topic.toBusinessModel()

  }

  public editTopic = async (
    input: EditTopicInputDTO
  ): Promise<EditTopicOutputDTO> => {

    const {
      idToEdit,
      title,
      content,
      token
    } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload || payload === null) {
      throw new UnauthorizedError()
    }

    if (!idToEdit) {
      throw new NotFoundError("Por favor, insira um id")
    }

    const topicToEditDB = await this.topicDatabase.findTopicById(idToEdit)

    if (!topicToEditDB) {
      throw new NotFoundError("Post com suposto id não encontrado, insira um id válido")
    }

    const topic = new Topic(
      topicToEditDB.id,
      topicToEditDB.title,
      topicToEditDB.content,
      topicToEditDB.likes,
      topicToEditDB.dislikes,
      topicToEditDB.created_at,
      new Date().toISOString(),
      topicToEditDB.creator_id,
      topicToEditDB.creator_username
    )


    title && topic.setTitle(title)
    content && topic.setContent(content)

    const updateTopicDB: TopicDB = {
      id: topic.getId(),
      title: topic.getTitle(),
      creator_id: topic.getCreatorId(),
      content: topic.getContent(),
      likes: topic.getLikes(),
      dislikes: topic.getDislikes(),
      created_at: topic.getCreatedAt(),
      updated_at: topic.getUpdatedAt()
    }

    if (payload.role === USER_ROLES.ADMIN) {
      await this.topicDatabase.updateTopicById(idToEdit, updateTopicDB)
    } else if (topicToEditDB.creator_id === payload.id) {
      await this.topicDatabase.updateTopicById(idToEdit, updateTopicDB)
    } else {
      throw new UnauthorizedError("Somente o administrador ou dono da postagem podem acessar este recurso.")
    }

    const output = {
      title: topic.getTitle(),
      content: topic.getContent()
    }

    return output

  }

  public deleteTopic = async (
    input: DeleteTopicInputDTO
  ): Promise<DeleteTopicOutputDTO> => {

    const { idToDelete, token } = input

    const topicToDeleteDB = await this.topicDatabase.findTopicById(idToDelete)
    const payload = this.tokenManager.getPayload(token)

    if (!payload || payload === null) {
      throw new UnauthorizedError()
    }

    if (!idToDelete) {
      throw new NotFoundError("Por favor, insira um id")
    }

    if (!topicToDeleteDB) {
      throw new NotFoundError("'ID' não encontrado")
    }

    const post = new Topic(
      topicToDeleteDB.id,
      topicToDeleteDB.title,
      topicToDeleteDB.content,
      topicToDeleteDB.likes,
      topicToDeleteDB.dislikes,
      topicToDeleteDB.created_at,
      topicToDeleteDB.updated_at,
      topicToDeleteDB.creator_id,
      topicToDeleteDB.creator_username,
    )

    if (payload.role === USER_ROLES.ADMIN) {
      await this.topicDatabase.deleteTopicById(idToDelete)
    } else if (topicToDeleteDB.creator_id === payload.id) {
      await this.topicDatabase.deleteTopicById(idToDelete)
    } else {
      throw new UnauthorizedError("Somente o administrador ou dono do tópico podem acessar este recurso.")
    }


    const output = {
      message: "Tópico deletado com sucesso",
    }
    return output
  }

  public likeOrDislikeTopic = async (
    input: LikeOrDislikeTopicInputDTO
  ): Promise<LikeOrDislikeTopicOutputDTO> => {

    const { topicId, like, token } = input

    const payload = this.tokenManager.getPayload(token)

    if (!payload || payload === null) {
      throw new UnauthorizedError()
    }

    const topicDBwithCreator = await this.topicDatabase.findTopicById(topicId)

    if (!topicDBwithCreator) {
      throw new NotFoundError("Tópico não encontrado")
    }

    const topic = new Topic(
      topicDBwithCreator.id,
      topicDBwithCreator.title,
      topicDBwithCreator.content,
      topicDBwithCreator.likes,
      topicDBwithCreator.dislikes,
      topicDBwithCreator.created_at,
      topicDBwithCreator.updated_at,
      topicDBwithCreator.creator_id,
      topicDBwithCreator.creator_username,
    )

    const likeSQL = like ? 1 : 0

    const likeDislikeDB: LikeOrDislikeDB = {
      user_id: payload.id,
      topic_id: topicId,
      like: likeSQL
    }

    const likeDislikeExists = await this.topicDatabase.findLikeOrDislike(likeDislikeDB)

    if (likeDislikeExists === TOPIC_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.topicDatabase.deleteLikeOrDislike(likeDislikeDB)
        topic.removeLike()
      } else {
        await this.topicDatabase.updateLikeOrDislike(likeDislikeDB)
        topic.removeLike()
        topic.addDislike()
      }

    } else if (likeDislikeExists === TOPIC_LIKE.ALREADY_DISLIKED) {
      if (like === false) {
        await this.topicDatabase.deleteLikeOrDislike(likeDislikeDB)
        topic.removeDislike()
      } else {
        await this.topicDatabase.updateLikeOrDislike(likeDislikeDB)
        topic.removeDislike()
        topic.addLike()
      }

    } else {
      await this.topicDatabase.insertLikeOrDislike(likeDislikeDB)
      like ? topic.addLike() : topic.addDislike()
    }

    const updatedTopicDB = topic.toDBModel()
    await this.topicDatabase.updateTopicById(updatedTopicDB.id, updatedTopicDB)

    const output: LikeOrDislikeTopicOutputDTO = undefined

    return output
  }
}