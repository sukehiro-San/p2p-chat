import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const socketContext = createContext(null);
const socket = io("http://localhost:8001").connect();

const SocketProvider = (props) => {
  return (
    <socketContext.Provider value={{ socket }}>
      {props.children}
    </socketContext.Provider>
  );
};

export const useSocket = () => useContext(socketContext);
export default SocketProvider;
