import React, { useState, useCallback } from 'react';
import { useReceiver } from '../hooks/peer';

function Receiver() {
  const { connection, messages } = useReceiver();
  const [message, setMessage] = useState('');
  const handleMessageChange = useCallback(evt => setMessage(evt.target.value), []);
  const handleSubmitMessage = useCallback(() => connection.send(message), [connection, message]);

  return (
    <div>
      <h1>Receiver</h1>
      <input value={message} onChange={handleMessageChange} />
      <button onClick={handleSubmitMessage}>SEND</button>
      <pre>{messages.join('\n')}</pre>
      <video id="video" />
      <video id="screenshare" />
    </div>
  );
}

export default Receiver;
