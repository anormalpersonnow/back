import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { CommentDatabaseMock } from "../../mocks/CommentDatabaseMock"
import { GetCommentsSchema } from "../../../src/dtos/Comments/getComments.dto"

describe("Testando get comments", () => {
  const comentBusiness = new CommentBusiness(
    new CommentDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve retornar todos os comentários", async () => {
    const input = GetCommentsSchema.parse({
      token: "token-mock-astrodev"
    })

    const output = await comentBusiness.getComments(input)

    expect(output).toHaveLength(2)
    expect(output).toEqual([
      {
        id: "comment01",
        content: "Fulano comentário",
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
        id: "comment02",
        content: "Astrodev comentário",
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

  test("deve retornar apenas comentários que tenham trechos de acordo com o conteúdo inserido", async () => {
    const input = GetCommentsSchema.parse({
      content: "Astrodev",
      token: "token-mock-astrodev"
    })

    const output = await comentBusiness.getComments(input)

    expect(output).toHaveLength(1)
    expect(output).toEqual([
      {
        id: "comment02",
        content: "Astrodev comentário",
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