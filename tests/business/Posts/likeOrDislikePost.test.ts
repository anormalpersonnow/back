import { PostBusiness } from '../../../src/business/PostBusiness'
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/PostDataBaseMock"
import { LikeOrDislikePostSchema } from '../../../src/dtos/Posts/likeOrDislike.dto'

describe("Testando likeOrDislikePost", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve fazer uma busca pelo array de postagens e dar um like no post", async () => {
    const input = LikeOrDislikePostSchema.parse({
      postId: "post01",
      like: true,
      token: "token-mock-astrodev"
    })

    const output = await postBusiness.likeOrDislikePost(input)

    expect(output).toBe(undefined)
  })

  test("deve fazer uma busca pelo array de comentários e dar um dislike no post", async () => {
    const input = LikeOrDislikePostSchema.parse({
      postId: "post01",
      like: false,
      token: "token-mock-astrodev"
    })

    const output = await postBusiness.likeOrDislikePost(input)

    expect(output).toBe(undefined)
  })

})
