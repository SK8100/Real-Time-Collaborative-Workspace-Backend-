import http from "http";
import app from "./app";
import { initSocket } from "./modules/realtime/socket";

const server = http.createServer(app);
initSocket(server);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
