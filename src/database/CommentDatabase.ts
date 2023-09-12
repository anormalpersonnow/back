import { LikeOrDislikeDB, COMMENT_LIKE } from "../models/LikeComment";
import { CommentDB, CommentDBWithCreator, CommentModel } from "../models/Comment";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDataBase";
import { PostDatabase } from "./PostDataBase";

export class CommentDatabase extends BaseDatabase {

  public static TABLE_COMMENTS = "comments";
  public static TABLE_LIKES_DISLIKES = "like_dislike_comments"

  public createComment= async (
    newCommentDB: CommentDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .insert(newCommentDB)
  }

  public getComments = async (): Promise<CommentDBWithCreator[]> => {

    const result: Array<CommentDBWithCreator> = await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .select(
        `${CommentDatabase.TABLE_COMMENTS}.id`,
        `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
        `${CommentDatabase.TABLE_COMMENTS}.content`,
        `${CommentDatabase.TABLE_COMMENTS}.likes`,
        `${CommentDatabase.TABLE_COMMENTS}.dislikes`,
        `${CommentDatabase.TABLE_COMMENTS}.created_at`,
        `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.username as creator_username`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )

    return result 
  }

  public findCommentById = async (
    id: string
  ): Promise<CommentDBWithCreator> => {

    const [result] = await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .select(
        `${CommentDatabase.TABLE_COMMENTS}.id`,
        `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
        `${CommentDatabase.TABLE_COMMENTS}.content`,
        `${CommentDatabase.TABLE_COMMENTS}.likes`,
        `${CommentDatabase.TABLE_COMMENTS}.dislikes`,
        `${CommentDatabase.TABLE_COMMENTS}.created_at`,
        `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.username as creator_username`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )
      .where({ [`${CommentDatabase.TABLE_COMMENTS}.id`]: id })

    return result as CommentDBWithCreator
  }

  public findCommentByContent = async (
    content: string
  ): Promise<CommentDBWithCreator[]> => {

    const result = await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .select(
        `${CommentDatabase.TABLE_COMMENTS}.id`,
        `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
        `${CommentDatabase.TABLE_COMMENTS}.content`,
        `${CommentDatabase.TABLE_COMMENTS}.likes`,
        `${CommentDatabase.TABLE_COMMENTS}.dislikes`,
        `${CommentDatabase.TABLE_COMMENTS}.created_at`,
        `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
        `${CommentDatabase.TABLE_COMMENTS}.username as creator_username`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${PostDatabase.TABLE_POSTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      )
      .where("content", "LIKE", `%${content}`)

    return result as CommentDBWithCreator[]
  }

  public findCommentCreatorById = async (
    id: string
  ): Promise<CommentDBWithCreator | undefined> => {

    const [result] = await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .select(
        `${CommentDatabase.TABLE_COMMENTS}..id as post_id`,
        `${CommentDatabase.TABLE_COMMENTS}..creator_id`,
        `${UserDatabase.TABLE_USERS}.username as creator_username`,
        `${CommentDatabase.TABLE_COMMENTS}.content`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      ).where({ creator_id: id })

    return result as CommentDBWithCreator | undefined
  }

  public findUserComments = async (
    creatorId: string
  ): Promise<CommentDBWithCreator[]> => {

    const postDB: Array<CommentDBWithCreator> = await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .where({ creator_id: creatorId })

    return postDB
  }

  public updateCommentById = async (
    idToEdit: string, TopicDB: CommentDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .update(TopicDB)
      .where({ id: idToEdit })
  }

  public deleteCommentById = async (
    idToDelete: string
  ): Promise<void> => {

    await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .delete()
      .where({ id: idToDelete })
  }


  public likeOrDislikeComment = async (
    id: string
  ): Promise<CommentModel | undefined> => {

    const [result] = await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .select(
        `${CommentDatabase.TABLE_COMMENTS}.id`,
        `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
        `${CommentDatabase.TABLE_COMMENTS}.content`,
        `${CommentDatabase.TABLE_COMMENTS}.likes`,
        `${CommentDatabase.TABLE_COMMENTS}.dislikes`,
        `${CommentDatabase.TABLE_COMMENTS}.created_at`,
        `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
        `${UserDatabase.TABLE_USERS}.username as creator_username`
      )
      .join(
        `${UserDatabase.TABLE_USERS}`,
        `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
        "=",
        `${UserDatabase.TABLE_USERS}.id`
      ).where({ [`${CommentDatabase.TABLE_COMMENTS}.id`]: id })

    return result as CommentModel | undefined
  }


  public findLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<COMMENT_LIKE | undefined> => {

    const [result]: Array<LikeOrDislikeDB | undefined> = await BaseDatabase
      .connection(CommentDatabase.TABLE_LIKES_DISLIKES)
      .select()
      .where({
        user_id: likeOrDislikeDB.user_id,
        comment_id: likeOrDislikeDB.comment_id
      })

    if (result === undefined) {
      return undefined
    } else if (result.like === 1) {
      return COMMENT_LIKE.ALREADY_LIKED
    } else {
      return COMMENT_LIKE.ALREADY_DISLIKED
    }

  }

  public deleteLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(CommentDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeOrDislikeDB.user_id,
        comment_id: likeOrDislikeDB.comment_id
      })
  }

  public updateLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(CommentDatabase.TABLE_LIKES_DISLIKES)
      .update(likeOrDislikeDB)
      .where({
        user_id: likeOrDislikeDB.user_id,
        comment_id: likeOrDislikeDB.comment_id
      })
  }

  public insertLikeOrDislike = async (
    likeOrDislikeDB: LikeOrDislikeDB
  ): Promise<void> => {

    await BaseDatabase
      .connection(CommentDatabase.TABLE_LIKES_DISLIKES)
      .insert(likeOrDislikeDB)
  }
  }


