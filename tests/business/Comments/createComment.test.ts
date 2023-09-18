import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { CreateCommentSchema } from "../../../src/dtos/Comments/createComment.dto"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"

describe("Testando create comment", () => {
  const comentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve criar um comentário novo", async () => {
    const input = CreateCommentSchema.parse({
      content: "Novo comentário",
      token: "token-mock-astrodev"
    })

    const output = await comentBusiness.createComment(input)

    expect(output).toBe(undefined)
  })
})