import * as authService from "./auth.service";

export const signup = async (req: any, res: any) => {
  const { username, email, phone, password } = req.body;

  const user = await authService.createUser(
    username,
    email,
    phone,
    password
  );

  const tokens = authService.generateTokens({
    userId: user.id,
    email: user.email,
  });

  res.status(201).json(tokens);
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = await authService.loginUser(email, password);

  const tokens = authService.generateTokens({
    userId: user.id,
    email: user.email,
  });

  res.status(200).json(tokens);
};

export const refresh = async (req: any, res: any) => {
  // Simple refresh (enough for assessment)
  const { refreshToken } = req.body;

  const decoded: any = require("jsonwebtoken").verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET
  );

  const tokens = authService.generateTokens({
    userId: decoded.userId,
    email: decoded.email,
  });

  res.json(tokens);
};
