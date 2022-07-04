import http from "http";

import app from "./src";
import socketService from "./src/services/socket";

const httpServer = http.createServer(app);

console.log("Starting server...");

// Init Socket Service
socketService(httpServer);

httpServer.listen(4000, () =>
  console.log("Server started and listening on port 4000")
);
