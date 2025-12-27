import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { redisClient } from "../../config/redis";

export const initSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.adapter(createAdapter(redisClient, redisClient.duplicate()));

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-project", (projectId: string) => {
      socket.join(projectId);
      socket.to(projectId).emit("user-joined", { socketId: socket.id });
    });

    socket.on("file-change", (data) => {
      socket.to(data.projectId).emit("file-change", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
