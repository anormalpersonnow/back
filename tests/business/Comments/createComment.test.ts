import { CommentBusiness } from "../../../src/business/CommentBusiness"
import { ZodError } from "zod"
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

  
  test("deve disparar erro quando o campo content não for criado", async () => {
    try {
      const input = CreateCommentSchema.parse({
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
      const input = CreateCommentSchema.parse({
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
      const input = CreateCommentSchema.parse({
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