import { UserBusiness } from "../../../src/business/UserBusiness"
import { DeleteUserSchema } from "../../../src/dtos/Users/deleteUser.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"

describe("Testando deleteUser", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new TokenManagerMock(),    
    new IdGeneratorMock(),
    new HashManagerMock()
  )

  test("deve remover um usuário da lista", async () => {
    const input = DeleteUserSchema.parse({
      idToDelete: "id-mock-fulano",
      token: "token-mock-fulano"
    })

    const output = await userBusiness.deleteUserById(input)

    expect(output).toEqual({
      message: "Usuário deletado com sucesso"
    })
  })
})