import { useEffect, useRef, useState } from 'react';

const Peer = window.Peer;

const id = 'hasyee';
const options = { key: 'peerjs', host: '192.168.0.4', port: 9000, debug: 0 };

const attachStreamToVideo = stream => {
  const video = document.querySelector('#video');
  video.srcObject = stream;
  video.onloadedmetadata = e => {
    setTimeout(() => video.play());
  };
};

/* const createVideoStream = (video = false, audio = false) => {
  return navigator.mediaDevices
    .getUserMedia({ video, audio })
    .catch(err => console.error('Failed create video screen', err));
}; */

const createScreenShare = () => {
  return navigator.mediaDevices
    .getDisplayMedia({ video: true, audio: true })
    .catch(err => console.error('Failed to create screen share', err));
};

export const useBroadcaster = () => {
  const peer = useRef();
  const connection = useRef();
  const stream = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    createScreenShare(false).then(s => {
      stream.current = s;
      attachStreamToVideo(stream.current);
      peer.current = new Peer(id, options);
      peer.current.on('error', error => console.error(error));
      peer.current.on('open', id => {});
      peer.current.on('connection', conn => {
        connection.current = conn;
        console.log('call', connection.current.peer);
        peer.current.call(connection.current.peer, stream.current);
        connection.current.on('error', error => console.error(error));
        connection.current.on('open', () => {});
        connection.current.on('data', data => {
          setMessages(messages => [...messages, data]);
        });
      });
    });
  }, [peer, connection]);

  return { connection: connection.current, messages };
};

export const useReceiver = () => {
  const peer = useRef();
  const connection = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    peer.current = new Peer(null, options);
    peer.current.on('open', id => {});
    peer.current.on('error', error => console.error('peer error', error));
    connection.current = peer.current.connect(id);
    connection.current.on('error', error => console.error('connection error', error));
    connection.current.on('open', () => {});
    connection.current.on('data', data => {
      setMessages(messages => [...messages, data]);
    });
    peer.current.on('call', call => {
      call.answer();
      call.on('stream', remoteStream => {
        console.log({ remoteStream });
        attachStreamToVideo(remoteStream);
      });
    });
  }, [peer, connection]);
  return { connection: connection.current, messages };
};
