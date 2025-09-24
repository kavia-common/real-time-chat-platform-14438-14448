import { io } from "socket.io-client";

const WS_BASE = process.env.REACT_APP_WS_BASE || "http://localhost:8000";

// PUBLIC_INTERFACE
export function createSocket(token) {
  /** Creates and returns a connected Socket.IO client with auth token. */
  const socket = io(WS_BASE, {
    transports: ["websocket"],
    auth: { token },
  });
  return socket;
}
