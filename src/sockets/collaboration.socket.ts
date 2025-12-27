import { Server } from "socket.io";

export const initCollaborationSocket = (io: Server) => {
  io.on("connection", (socket) => {
    socket.on("join", (projectId) => {
      socket.join(projectId);
      socket.to(projectId).emit("user-joined", socket.id);
    });

    socket.on("file-change", (data) => {
      socket.to(data.projectId).emit("file-change", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
