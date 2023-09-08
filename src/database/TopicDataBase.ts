import { LikeOrDislikeDB, TOPIC_LIKE } from "../models/LikeTopic";
import { TopicDB, TopicDBWithCreator, TopicModel } from "../models/Topic";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDataBase";
import { PostDatabase } from "./PostDataBase";
import { PostModel } from "../models/Post";

export class TopicDatabase extends BaseDatabase {

  public static TABLE_TOPICS = "topics";
  public static TABLE_LIKES_DISLIKES = "like_dislikes_topics"

  public createTopic= async (
    newTopicDB: TopicDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(TopicDatabase.TABLE_TOPICS)
      .insert(newTopicDB)
  }

  public getTopics = async (): Promise<TopicDBWithCreator[]> => {

    const result: Array<TopicDBWithCreator> = await BaseDatabase
      .connection(TopicDatabase.TABLE_TOPICS)
      .select(
        `${TopicDatabase.TABLE_TOPICS}.id`,
        `${TopicDatabase.TABLE_TOPICS}.creator_id`,
        `${TopicDatabase.TABLE_TOPICS}.content`,
        `${TopicDatabase.TABLE_TOPICS}.likes`,
        `${TopicDatabase.TABLE_TOPICS}.dislikes`,
        `${TopicDatabase.TABLE_TOPICS}.created_at`,
        `${TopicDatabase.TABLE_TOPICS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.username as creator_username`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${TopicDatabase.TABLE_TOPICS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )

    return result 
  }

  public findTopicById = async (
    id: string
  ): Promise<TopicDBWithCreator> => {

    const [result] = await BaseDatabase
      .connection(TopicDatabase.TABLE_TOPICS)
      .select(
        `${TopicDatabase.TABLE_TOPICS}.id`,
        `${TopicDatabase.TABLE_TOPICS}.creator_id`,
        `${TopicDatabase.TABLE_TOPICS}.content`,
        `${TopicDatabase.TABLE_TOPICS}.likes`,
        `${TopicDatabase.TABLE_TOPICS}.dislikes`,
        `${TopicDatabase.TABLE_TOPICS}.created_at`,
        `${TopicDatabase.TABLE_TOPICS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.username as creator_username`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${TopicDatabase.TABLE_TOPICS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )
      .where({ [`${TopicDatabase.TABLE_TOPICS}.id`]: id })

    return result as TopicDBWithCreator
  }

  public findTopicByTitle = async (
    title: string
  ): Promise<TopicDBWithCreator[]> => {

    const result = await BaseDatabase
      .connection(TopicDatabase.TABLE_TOPICS)
      .select(
        `${TopicDatabase.TABLE_TOPICS}.id`,
        `${TopicDatabase.TABLE_TOPICS}.creator_id`,
        `${TopicDatabase.TABLE_TOPICS}.content`,
        `${TopicDatabase.TABLE_TOPICS}.likes`,
        `${TopicDatabase.TABLE_TOPICS}.dislikes`,
        `${TopicDatabase.TABLE_TOPICS}.created_at`,
        `${TopicDatabase.TABLE_TOPICS}.updated_at`,
        `${TopicDatabase.TABLE_TOPICS}.username as creator_username`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )
      .where("title", "LIKE", `%${title}`)

    return result as TopicDBWithCreator[]
  }

  public findTopicCreatorById = async (
    id: string
  ): Promise<TopicDBWithCreator | undefined> => {

    const [result] = await BaseDatabase
      .connection(TopicDatabase.TABLE_TOPICS)
      .select(
        `${TopicDatabase.TABLE_TOPICS}.id as post_id`,
        `${TopicDatabase.TABLE_TOPICS}.creator_id`,
        `${UserDatabase.TABLE_USERS}.username as creator_username`,
        `${TopicDatabase.TABLE_TOPICS}.content`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${TopicDatabase.TABLE_TOPICS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      ).where({ creator_id: id })

    return result as TopicDBWithCreator | undefined
  }

  public findUserTopics = async (
    creatorId: string
  ): Promise<TopicDBWithCreator[]> => {

    const postDB: Array<TopicDBWithCreator> = await BaseDatabase
      .connection(TopicDatabase.TABLE_TOPICS)
      .where({ creator_id: creatorId })

    return postDB
  }

  public updateTopicById = async (
    idToEdit: string, TopicDB: TopicDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(TopicDatabase.TABLE_TOPICS)
      .update(TopicDB)
      .where({ id: idToEdit })
  }

  public deleteTopicById = async (
    idToDelete: string
  ): Promise<void> => {

    await BaseDatabase
      .connection(TopicDatabase.TABLE_TOPICS)
      .delete()
      .where({ id: idToDelete })
  }


  public likeOrDislikeTopic = async (
    id: string
  ): Promise<TopicModel | undefined> => {

    const [result] = await BaseDatabase
      .connection(TopicDatabase.TABLE_TOPICS)
      .select(
        `${TopicDatabase.TABLE_TOPICS}.id`,
        `${TopicDatabase.TABLE_TOPICS}.creator_id`,
        `${TopicDatabase.TABLE_TOPICS}.content`,
        `${TopicDatabase.TABLE_TOPICS}.likes`,
        `${TopicDatabase.TABLE_TOPICS}.dislikes`,
        `${TopicDatabase.TABLE_TOPICS}.created_at`,
        `${TopicDatabase.TABLE_TOPICS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.username as creator_username`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${TopicDatabase.TABLE_TOPICS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      ).where({ [`${TopicDatabase.TABLE_TOPICS}.id`]: id })

    return result as TopicModel | undefined
  }


  public findLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<TOPIC_LIKE | undefined> => {

    const [result]: Array<LikeOrDislikeDB | undefined> = await BaseDatabase
      .connection(TopicDatabase.TABLE_LIKES_DISLIKES)
      .select()
      .where({
        user_id: likeOrDislikeDB.user_id,
        topic_id: likeOrDislikeDB.topic_id
      })

    if (result === undefined) {
      return undefined
    } else if (result.like === 1) {
      return TOPIC_LIKE.ALREADY_LIKED
    } else {
      return TOPIC_LIKE.ALREADY_DISLIKED
    }

  }

  public deleteLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(TopicDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeOrDislikeDB.user_id,
        topic_id: likeOrDislikeDB.topic_id
      })
  }

  public updateLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(TopicDatabase.TABLE_LIKES_DISLIKES)
      .update(likeOrDislikeDB)
      .where({
        user_id: likeOrDislikeDB.user_id,
        topic_id: likeOrDislikeDB.topic_id
      })
  }

  public insertLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(TopicDatabase.TABLE_LIKES_DISLIKES)
      .insert(likeOrDislikeDB)
  }
  }


