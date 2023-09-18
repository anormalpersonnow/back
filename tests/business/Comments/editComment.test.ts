import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { EditCommentSchema } from "../../../src/dtos/Comments/editComment.dto"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"

describe("Testando create comment", () => {
  const comentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve editar dados do usuário pelo ID", async () => {
    const input = EditCommentSchema.parse({
      idToEdit: "comment01",
      content: "Fulano comentário editado",
      token: "token-mock-fulano"
    })

    const output = await comentBusiness.editComment(input)

    expect(output).toEqual({
      content: "Fulano comentário editado"
    })
  })
})