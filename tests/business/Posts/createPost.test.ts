import { ZodError } from 'zod'
import { PostBusiness } from "../../../src/business/PostBusiness"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { PostDatabaseMock } from "../../mocks/PostDataBaseMock"
import { CreatePostSchema } from "../../../src/dtos/Posts/createPost.dto"

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

  
  test("deve disparar erro quando o campo content não for criado", async () => {
    try {
      const input = CreatePostSchema.parse({
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("content: Required")
    }
  }
  })

  test("deve disparar erro na ausência de content", async () => {
    try {
      const input = CreatePostSchema.parse({
        content: "",
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("content: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência de token", async () => {
    try {
      const input = CreatePostSchema.parse({
        content: "aaaa",
        token: ""
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: String must contain at least 1 character(s)")
    }
  }
  })

})