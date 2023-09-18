import { PostBusiness } from '../../../src/business/PostBusiness'
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/PostDataBaseMock"
import { GetPostsSchema } from '../../../src/dtos/Posts/getPosts.dto'

describe("Testando getPosts", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve retornar todas as postagens", async () => {
    const input = GetPostsSchema.parse({
      token: "token-mock-astrodev"
    })

    const output = await postBusiness.getPosts(input)

    expect(output).toHaveLength(2)
    expect(output).toEqual([
      {
        id: "post01",
        content: "Primeiro post",
        likes: 1,
        dislikes: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        creator: {
          id: "id-mock-fulano",
          username: "Fulano"
        }
      },
      {
        id: "post02",
        content: "Segundo post",
        likes: 1,
        dislikes: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        creator: {
          id: "id-mock-astrodev",
          username: "Astrodev"
        }
      },
    ])
  })

  test("deve retornar apenas postagens que tenham trechos de acordo com o conteúdo inserido", async () => {
    const input = GetPostsSchema.parse({
      content: "Segundo",
      token: "token-mock-astrodev"
    })

    const output = await postBusiness.getPosts(input)

    expect(output).toHaveLength(1)
    expect(output).toEqual([
      {
        id: "post02",
        content: "Segundo post",
        likes: 1,
        dislikes: 0,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        creator: {
          id: "id-mock-astrodev",
          username: "Astrodev"
        }
      }])
  })
})