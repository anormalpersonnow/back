import { UserBusiness } from "../../../src/business/UserBusiness"
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
})