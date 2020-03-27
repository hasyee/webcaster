import React, { useState, useCallback } from 'react';
import { useBroadcaster } from '../hooks/peer';

function Broadcaster() {
  const { connection, messages } = useBroadcaster();
  const [message, setMessage] = useState('');
  const handleMessageChange = useCallback(evt => setMessage(evt.target.value), []);
  const handleSubmitMessage = useCallback(() => connection.send(message), [connection, message]);

  return (
    <div>
      <h1>Broadcaster</h1>
      <input value={message} onChange={handleMessageChange} />
      <button onClick={handleSubmitMessage}>SEND</button>
      <pre>{messages.join('\n')}</pre>
      <video id="video" />
      <video id="screenshare" />
    </div>
  );
}

export default Broadcaster;
