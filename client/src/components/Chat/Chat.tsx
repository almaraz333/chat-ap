import { ChatProps } from './types';
import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

export const Chat: React.FC<ChatProps> = () => {
  const ENDPOINT = 'http://localhost:4000';

  const [message, setMessage] = useState('initialState');
  const socket = io(ENDPOINT);

  useEffect(() => {
    socket.emit('yo', 'yo');

    socket.on('message', (data) => console.log(data));
  }, [socket]);

  return (
    <div data-testid="chat flex flex-col">
      Chat
      <button onClick={() => socket.emit('log', 'message')}>click</button>
    </div>
  );
};
