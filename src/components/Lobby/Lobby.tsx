import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { usePeer } from "../../providers/Peer";
import { useSocket } from "../../providers/Socket";
import "./Lobby.scss";

const Lobby = () => {
  const { socket } = useSocket();
  const {
    peer,
    createOffer,
    createAnswer,
    setRemoteDesc,
    sendStream,
    remoteStream,
  } = usePeer();
  const [myStream, setMyStream] = useState(null);
  const [remoteEmail, setRemoteEmail] = useState(null);

  const handleNewUserJoined = useCallback( async ({ roomID, emailID }) => {
    console.log(`New user with mail ${emailID} joined room ${roomID}`);
    const offer = await createOffer();
    console.log("Offer created and Sent", offer);
    socket.emit("call-user", { emailID, offer });
    setRemoteEmail(emailID);
  },[createOffer, socket]);

  const handleIncomingCall = useCallback( async ({ from, offer }) => {
    console.log("Incoming call", from, offer);
    const ans = await createAnswer(offer);
    socket.emit("call-accepted", { emailID: from, answer: ans });
    setRemoteEmail(from);
  },[createAnswer, socket]);

  const handleAcceptedCall = useCallback( async ({ answer }) => {
    await setRemoteDesc(answer);
    console.log("call answered", answer);
  },[setRemoteDesc]);

  const getUserMediaStream = useCallback( async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  },[]);

  const handleNegotiation = useCallback( () => {
    console.log("!oops negotiation needed");
    const localOffer = peer.localDescription;
    socket.emit("call-user", { emailId: remoteEmail, offer: localOffer });
  },[peer.localDescription, remoteEmail, socket]);

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-answered", handleAcceptedCall);

    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-answered", handleAcceptedCall);
    };
  },[handleAcceptedCall, handleIncomingCall, handleNewUserJoined, socket]);

  useEffect(() => {
    peer.addEventListener("negotiationneeded", handleNegotiation);

    return () => {
      peer.removeEventListener("track", handleNegotiation);
    };
  },[handleNegotiation, peer]);

  useEffect(() => {
    getUserMediaStream();
  },[getUserMediaStream]);
  return (
    <div>
      <h1>Lobby for Video Call</h1>
      <h4>You are connected to {remoteEmail}</h4>
      <button onClick={(e) => sendStream(myStream)}>Send my stream</button>
      <ReactPlayer url={myStream} playing muted />
      <ReactPlayer url={remoteStream} playing muted />
    </div>
  );
};

export default Lobby;
