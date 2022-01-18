import { ChatProps } from './types';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { ChatMessage } from '..';

export const Chat: React.FC<ChatProps> = () => {
  const ENDPOINT = 'http://localhost:4000';

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<(string | undefined)[]>([]);
  const socket = io(ENDPOINT);

  useEffect(() => {
    socket.on('message', (data) => setMessages((prev) => [...prev, data]));
  }, [socket]);

  const handleMessageSend = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div data-testid="chat" className="flex flex-col">
      <div className="flex w-screen h-screen">
        <div className="w-[15vw] h-full white-glassmorphism"></div>
        <div className="w-full h-full bg-blue-300 flex flex-col">
          <div>
            {messages &&
              messages.map((msg, i) => (
                <ChatMessage message={msg} key={`${i}-${msg}`} />
              ))}
          </div>
          <div className="flex items-center justify-center mt-auto mb-5">
            <input
              className="mr-5 h-7 w-9/12 rounded-md p-3"
              id="chat-message"
              type="text"
              placeholder="Message..."
              onKeyPress={(e) => {
                if (e.code === 'Enter') handleMessageSend();
              }}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              required
            />
            <button
              className="rounded-md bg-blue-500 text-white w-1/12 h-7"
              onClick={handleMessageSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
