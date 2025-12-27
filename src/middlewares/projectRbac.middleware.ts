import { client } from "../config/dbConnect";

export const projectRbac = (roles: string[]) => {
  return async (req: any, res: any, next: any) => {
    const userId = req.user.userId;
    const projectId = req.params.id;

    const result = await client.query(
      `SELECT role FROM project_members
       WHERE user_id=$1 AND project_id=$2`,
      [userId, projectId]
    );

    if (!result.rows.length || !roles.includes(result.rows[0].role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};
