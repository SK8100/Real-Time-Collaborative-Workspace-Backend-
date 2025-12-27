import request from "supertest";
import app from "../src/app"; // adjust if needed

describe("Projects API", () => {
  it("should reject unauthenticated request", async () => {
    const res = await request(app).post("/api/v1/projects");

    expect(res.status).toBe(401);
  });
});
