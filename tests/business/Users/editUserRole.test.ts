import { UserBusiness } from "../../../src/business/UserBusiness"
import { ZodError } from "zod"
import { ChangeUserRoleSchema } from "../../../src/dtos/Users/changeUserRole.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando editUserRole", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new TokenManagerMock(),    
    new IdGeneratorMock(),
    new HashManagerMock()
  )

  test("deve trocar a role de um usuário para ADMIN ou NORMAL", async () => {
    const input = ChangeUserRoleSchema.parse({
      id: "id-mock-fulano",
      role: "ADMIN",
      token: "token-mock-astrodev"
    })

    const output = await userBusiness.editUserRoleById(input)

    expect(output).toEqual({
      id: "id-mock-fulano",
      username: "Fulano",
      role: "ADMIN"
    })
  })

  test("deve disparar erro na ausência de id", async () => {
    try {
      const input = ChangeUserRoleSchema.parse({
        id: "",
        username: "Fulano",
        role: "ADMIN",
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("id: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência de id", async () => {
    try {
      const input = ChangeUserRoleSchema.parse({
        id: "",
        username: "Fulano",
        role: "ADMIN",
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("id: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência de username", async () => {
    try {
      const input = ChangeUserRoleSchema.parse({
        id: "id-mock-fulano",
        username: "",
        role: "ADMIN",
        token: "token-mock-astrodev"
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("username: String must contain at least 1 character(s)")
    }
  }
  })

  test("deve disparar erro na ausência de token", async () => {
    try {
      const input = ChangeUserRoleSchema.parse({
        id: "id-mock-fulano",
        username: "Fulano",
        role: "ADMIN",
        token: ""
    })
  } catch (error) {
    if (error instanceof ZodError) {
      expect("token: String must contain at least 1 character(s)")
    }
  }
  })

})