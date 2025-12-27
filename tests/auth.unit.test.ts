import jwt from "jsonwebtoken";

describe("Auth Token Generation", () => {
  it("should generate a valid JWT token", () => {
    const payload = { userId: "test-user", role: "OWNER" };
    const token = jwt.sign(payload, "test-secret", { expiresIn: "1h" });

    const decoded = jwt.verify(token, "test-secret") as any;

    expect(decoded.userId).toBe("test-user");
    expect(decoded.role).toBe("OWNER");
  });
});
