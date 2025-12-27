import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { client } from "../../config/dbConnect";
import { env } from "../../config/env";

export const createUser = async (
  username: string,
  email: string,
  phone: string,
  password: string
) => {
  const hashed = bcrypt.hashSync(password, 10);

  const result = await client.query(
    `INSERT INTO users (username,email,phone,password)
     VALUES ($1,$2,$3,$4)
     RETURNING id,email`,
    [username, email, phone, hashed]
  );

  return result.rows[0];
};

export const loginUser = async (email: string, password: string) => {
  const result = await client.query(
    `SELECT id,email,password FROM users WHERE email=$1`,
    [email]
  );

  if (!result.rows.length) throw new Error("Invalid credentials");

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error("Invalid credentials");

  return { id: user.id, email: user.email };
};

export const generateTokens = (payload: object) => {
  const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
