export interface LikeOrDislikeDB {
    user_id: string,
    topic_id: string,
    like: number
}

export interface LikeOrDislikeModel {
    user_id: string,
    topic_id: string,
    like: number
}

export enum TOPIC_LIKE{
    ALREADY_LIKED = "ALREADY LIKED",
    ALREADY_DISLIKED = "ALREADY DISLIKED"
}

export class LikeOrDislike {
    constructor(
        private userId: string,
        private topicId: string,
        private like: number
    ) { }

    public getUserId(): string {
        return this.userId
    }

    public setUserId(value: string): void {
        this.userId = value
    }

    public getTopicId(): string {
        return this.topicId
    }

    public setTopicId(value: string): void {
        this.topicId = value
    }

    public getLike(): number {
        return this.like
    }

    public setLike(value: number){
        this.like = value
    }

    public toDBModel(): LikeOrDislikeDB {
        return {
            user_id: this.userId,
            topic_id: this.topicId,
            like: this.like
        }
    }

    public toBusinessModel(): LikeOrDislikeModel {
        return {
            user_id: this.userId,
            topic_id: this.topicId,
            like: this.like
        }
    }

}
