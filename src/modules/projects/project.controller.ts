import * as service from "./project.service";

export const createProject = async (req: any, res: any) => {
  const project = await service.createProject(
    req.user.userId,
    req.body.name
  );
  res.status(201).json(project);
};

export const getProjects = async (req: any, res: any) => {
  const projects = await service.getProjects(req.user.userId);
  res.json(projects);
};

export const inviteMember = async (req: any, res: any) => {
  const { email, role } = req.body;
  await service.inviteMember(req.params.id, email, role);
  res.json({ message: "User invited successfully" });
};