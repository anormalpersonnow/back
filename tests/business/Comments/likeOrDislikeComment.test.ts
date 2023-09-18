import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { LikeOrDislikeCommentSchema } from "../../../src/dtos/Comments/likeOrDislike.dto"

describe("Testando likeOrDislikeComment", () => {
  const comentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve fazer uma busca pelo array de comentários e dar um like no comentário", async () => {
    const input = LikeOrDislikeCommentSchema.parse({
      commentId: "comment01",
      like: true,
      token: "token-mock-astrodev"
    })

    const output = await comentBusiness.likeOrDislikeComment(input)

    expect(output).toBe(undefined)
  })


  test("deve fazer uma busca pelo array de comentários e dar um dislike no post", async () => {
    const input = LikeOrDislikeCommentSchema.parse({
      commentId: "comment01",
      like: false,
      token: "token-mock-astrodev"
    })

    const output = await comentBusiness.likeOrDislikeComment(input)

    expect(output).toBe(undefined)
  })

})
