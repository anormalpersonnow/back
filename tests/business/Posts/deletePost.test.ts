import { PostBusiness } from '../../../src/business/PostBusiness'
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/PostDataBaseMock"
import { DeletePostSchema } from '../../../src/dtos/Posts/deletePost.dto'

describe("Testando deletePost", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve deletar um comentário", async () => {
    const input = DeletePostSchema.parse({
      idToDelete: "post01",
      token: "token-mock-fulano"
    })

    const output = await postBusiness.deletePost(input)

    expect(output).toEqual({ message: "Postagem deletada com sucesso" })
  })
})