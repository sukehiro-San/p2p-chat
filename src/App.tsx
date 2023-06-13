import { Route, Routes } from "react-router";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import RoomJoin from "./components/RoomJoin/RoomJoin";
import SocketProvider from "./providers/Socket";
import Lobby from "./components/Lobby/Lobby";
import "./App.scss";
import PeerProvider from "./providers/Peer";

function App() {
  return (
    
      <SocketProvider>
        <PeerProvider>
          <Routes>
            <Route index element={<RoomJoin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/room/:roomid" element={<Lobby />} />
          </Routes>
        </PeerProvider>
      </SocketProvider>
    
  );
}

export default App;
