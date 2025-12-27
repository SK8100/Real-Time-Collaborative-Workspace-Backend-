import { client } from "../../config/dbConnect";

export const createProject = async (userId: string, name: string) => {
  const project = await client.query(
    `INSERT INTO projects (name, owner_id)
     VALUES ($1,$2) RETURNING *`,
    [name, userId]
  );

  await client.query(
    `INSERT INTO project_members VALUES ($1,$2,'OWNER')`,
    [project.rows[0].id, userId]
  );

  return project.rows[0];
};

export const getProjects = async (userId: string) => {
  const result = await client.query(
    `SELECT p.*
     FROM projects p
     JOIN project_members pm ON pm.project_id=p.id
     WHERE pm.user_id=$1`,
    [userId]
  );
  return result.rows;
};

export const inviteMember = async (
  projectId: string,
  email: string,
  role: string
) => {
  const user = await client.query(
    `SELECT id FROM users WHERE email=$1`,
    [email]
  );

  await client.query(
    `INSERT INTO project_members VALUES ($1,$2,$3)`,
    [projectId, user.rows[0].id, role]
  );
};
