import User from "../entities/user.entity";

describe("User Entity", () => {
  it("should create a new user", () => {
    const user = new User();
    user.email = "test@example.com";
    user.password = "password123";

    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("password123");
  });
});