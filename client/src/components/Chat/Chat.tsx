import { ChatProps } from './types';
import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '..';
import { DefaultEventsMap } from '@socket.io/component-emitter';

export const Chat: React.FC<ChatProps> = () => {
  const ENDPOINT = 'http://localhost:4000';

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    ({ name: string; message: string; time: string } | undefined)[]
  >([]);

  const messagesRef = useRef<null | HTMLDivElement>(null);

  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );

  useEffect(() => {
    socket.current = io(ENDPOINT);

    socket.current.on('message', (data) =>
      setMessages((prev) => [...prev, data])
    );

    return () => {
      socket.current?.emit('disconnect');

      socket.current?.off();
    };
  }, [ENDPOINT]);

  const handleMessageSend = () => {
    socket.current?.emit('message', message);
    setMessage('');
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div data-testid="chat" className="flex flex-col">
      <div className="flex w-screen h-screen">
        <div className="w-[15vw] h-full blue-glassmorphism"></div>
        <div className="w-full h-full bg-gray-100 flex flex-col ">
          <div
            ref={messagesRef}
            className="h-max-[100vh] h-[100vh] overflow-scroll pb-10 no-scrollbar"
          >
            {messages &&
              messages.map((msg, i) => (
                <ChatMessage message={msg} key={`${i}-${msg}`} />
              ))}
          </div>
          <div className="w-8/12 flex items-center justify-around mt-auto mb-5 bg-gray-200 py-4 mx-auto rounded-lg shadow-lg">
            <input
              className="h-7 w-9/12 rounded-md p-3"
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
