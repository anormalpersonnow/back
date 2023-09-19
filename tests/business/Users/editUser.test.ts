import { UserBusiness } from "../../../src/business/UserBusiness"
import { ZodError } from "zod"
import { EditUserSchema } from "../../../src/dtos/Users/editUser.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando editUser", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new TokenManagerMock(),    
    new IdGeneratorMock(),
    new HashManagerMock()
  )

  test("deve editar dados do usuário pelo ID", async () => {
    const input = EditUserSchema.parse({
      idToEdit: "id-mock-astrodev",
      password: "astrodev98",
      token: "token-mock-astrodev"
    })

    const output = await userBusiness.editUserById(input)

    expect(output).toEqual({
      message: "Usuário editado com sucesso"
    })
  })

  test("deve disparar erro na ausência de idToEdit", async () => {
    try {
      const input = EditUserSchema.parse({
        idToEdit: "id-mock-fulano",
        username: "Fulane",
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("idToEdit: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência de token", async () => {
    try {
      const input = EditUserSchema.parse({
        idToEdit: "id-mock-fulano",
        username: "Fulane",
        token: ""
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: String must contain at least 1 character(s)")
    }
  }
  })

})