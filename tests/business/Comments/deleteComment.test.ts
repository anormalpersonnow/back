import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { DeleteCommentSchema } from "../../../src/dtos/Comments/deleteComment.dto"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"

describe("Testando delete comment", () => {
  const comentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve deletar um comentário", async () => {
    const input = DeleteCommentSchema.parse({
      idToDelete: "comment01",
      token: "token-mock-fulano"
    })

    const output = await comentBusiness.deleteComment(input)

    expect(output).toEqual({ message: "Comentário deletado com sucesso" })
  })
})