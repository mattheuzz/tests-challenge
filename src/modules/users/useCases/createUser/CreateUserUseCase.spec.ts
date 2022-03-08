import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  })
  it("Should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "matheus",
      email: "matheus@test.com",
      password: "123456"
    })

    expect(user).toHaveProperty("id");
  })
  it("Should not be able to with the same email", async () => {
    expect(async ()=> {
      await createUserUseCase.execute({
        name: "matheus",
        email: "matheus@test.com",
        password: "123456"
      })
      await createUserUseCase.execute({
        name: "matheus",
        email: "matheus@test.com",
        password: "123456"
      })
    }).rejects.toBeInstanceOf(AppError);
  })
})
