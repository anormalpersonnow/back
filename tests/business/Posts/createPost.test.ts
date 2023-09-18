import { PostBusiness } from '../../../src/business/PostBusiness'
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/PostDataBaseMock"
import { CreatePostSchema } from '../../../src/dtos/Posts/createPost.dto'

describe("Testando createPost", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve criar uma postagem nova", async () => {
    const input = CreatePostSchema.parse({
      content: "Nova postagem",
      token: "token-mock-astrodev"
    })

    const output = await postBusiness.createPost(input)

    expect(output).toBe(undefined)
  })
})