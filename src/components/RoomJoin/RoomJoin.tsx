import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSocket } from "../../providers/Socket";
import "./RoomJoin.scss";
import { usePeer } from "../../providers/Peer";

const RoomJoin = () => {
  const { socket } = useSocket();
  const [emailID, setEmailID] = useState("");
  const [roomID, setRoomID] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(() => {
    socket.emit("join-room", { emailID, roomID });
  }, [socket, emailID, roomID]);

  const handleRoomJoined = useCallback(
    ({ roomID }) => {
      console.log("Room joined", roomID);
      navigate(`/room/${roomID}`);
    },
    [socket, navigate]
  );

  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);

    return () => {
      socket.off("joined-room", handleRoomJoined);
    };
  });

  return (
    <div className="lobby-container">
      <input
        type="email"
        name="emailID"
        id="emailID"
        placeholder="emailID"
        onChange={(ev) => setEmailID(ev.target.value)}
      />
      <input
        type="text"
        name="roomID"
        id="roomID"
        placeholder="roomID"
        onChange={(ev) => setRoomID(ev.target.value)}
      />
      <input type="button" onClick={handleJoinRoom} value="Join Room" />
    </div>
  );
};

export default RoomJoin;
