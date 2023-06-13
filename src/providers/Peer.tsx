import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const peerContext = createContext(null);

const PeerProvider = (props) => {
  const [remoteStream, setRemoteStream] = useState(null);

  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun1.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      }),
    []
  );

  const createOffer = useCallback(async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    // console.log("offer created", offer);
    return offer;
  }, [peer]);

  const createAnswer = useCallback(
    async (offer) => {
      console.log("create answer called", offer);
      await peer.setRemoteDescription(offer);
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      return answer;
    },
    [peer]
  );

  const setRemoteDesc = useCallback(
    async (answer) => {
      await peer.setRemoteDescription(answer);
    },
    [peer]
  );

  const sendStream = useCallback(
    async (stream) => {
      const tracks = stream.getTracks();
      for (let track of tracks) {
        peer.addTrack(track, stream);
      }
    },
    [peer]
  );

  function handleRemoteStream(ev): void {
    const streams = ev.streams;
    setRemoteStream(streams);
  }

  useEffect(() => {
    peer.addEventListener("track", handleRemoteStream);
    return () => {
      peer.removeEventListener("track", handleRemoteStream);
    };
  }, [peer]);

  return (
    <peerContext.Provider
      value={{
        peer,
        createOffer,
        createAnswer,
        setRemoteDesc,
        sendStream,
        remoteStream,
      }}
    >
      {props.children}
    </peerContext.Provider>
  );
};

export const usePeer = () => useContext(peerContext);
export default PeerProvider;
