import jwt from "jsonwebtoken";
import { client } from "../../config/dbConnect";

type DecodedJWT = {
  email: string;
};

export const fetchUserData = async (req: any, res: any) => {
  const { email } = req.user;

  const result = await client.query(
    `SELECT username,email,phone,image FROM users WHERE email=$1`,
    [email]
  );

  res.json({ success: true, user: result.rows[0] });
};

export const uploadImage = async (req: any, res: any) => {
  const { email } = req.user;

  await client.query(
    `UPDATE users SET image=$1 WHERE email=$2`,
    [req.file?.filename, email]
  );

  res.json({ success: true });
};
