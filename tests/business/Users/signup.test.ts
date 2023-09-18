import { UserBusiness } from "../../../src/business/UserBusiness"
import { SignupSchema } from "../../../src/dtos/Users/signup.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando signup", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new TokenManagerMock(),    
    new IdGeneratorMock(),
    new HashManagerMock()
  )

  test("deve gerar token ao cadastrar", async () => {
    const input = SignupSchema.parse({
      username: "Ciclana",
      email: "ciclana@email.com",
      password: "ciclana321"
    })

    const output = await userBusiness.signup(input)

    expect(output).toEqual({
      token: "token-mock"
    })
  })
})