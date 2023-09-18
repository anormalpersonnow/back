import { UserBusiness } from "../../../src/business/UserBusiness"
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
      idToEdit: "id-mock-fulano",
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
})