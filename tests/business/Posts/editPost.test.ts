import { PostBusiness } from '../../../src/business/PostBusiness'
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/PostDataBaseMock"
import { EditPostSchema } from '../../../src/dtos/Posts/editPost.dto'

describe("Testando editPost", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )
  
  test("deve editar o conteúdo da postagem de acordo com o ID", async () => {
    const input = EditPostSchema.parse({
      idToEdit: "post01",
      content: "Primeiro comentário editado",
      token: "token-mock-fulano"
    })

    const output = await postBusiness.editPost(input)

    expect(output).toEqual({
      content: "Primeiro comentário editado"
    })
  })
})