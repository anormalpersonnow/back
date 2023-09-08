import { PostModel } from "./Post"

export interface TopicDB {
    id: string,
    title: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface TopicDBWithCreator extends TopicDB{
    creator_username: string
}

export interface TopicModel {
    id: string,
    title: string,
    content: string,
    likes: number,
    dislikes: number,
    posts: PostModel[],
    created_at: string,
    updated_at: string,
    creator: {
        id: string,
        username: string
    }
}

export class Topic {
    constructor(
        private id: string,
        private title: string,
        private content: string,
        private likes: number,
        private dislikes: number,
        private posts: PostModel[],
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorUsername: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getTitle(): string{
        return this.title
    }

    public setTitle(value: string): void{
        this.title = value
    }

    public getContent(): string {
        return this.content
    }

    public setContent(value: string): void {
        this.content = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = this.likes + value
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = this.dislikes + value
    }

    public addLike = (): void => {
        this.likes++
    }

    public removeLike = (): void => {
        this.likes--
    }

    public addDislike = (): void => {
        this.dislikes++
    }

    public removeDislike = (): void => {
        this.dislikes--
    }

    public insertPost = (value: PostModel):void => {
        this.posts.push(value)
    }

    public removePost = (value: PostModel):void => {
        
        const newPostsArray = this.posts.filter(post => post.id !== value.id)
        this.posts = newPostsArray
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public getUpdatedAt(): string {
        return this.updatedAt
    }

    public setUpdatedAt(value: string): void {
        this.updatedAt = value
    }

    public getCreatorId(): string {
        return this.creatorId
    }

    public setCreatorId(value: string): void {
        this.creatorId = value
    }

    public getCreatorUsername(): string {
        return this.creatorUsername
    }

    public setCreatorUsername(value: string): void {
        this.creatorUsername = value
    }


    public toDBModel(): TopicDB {
        return {
            id: this.id,
            title: this.title,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

    public toBusinessModel(): TopicModel {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            likes: this.likes,
            dislikes: this.dislikes,
            posts: this.posts,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            creator: {
                id: this.creatorId,
                username: this.creatorUsername
            }
            }
        }
    }
