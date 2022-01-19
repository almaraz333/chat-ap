import { ChatProps, Message, User } from './types';
import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { useParams } from 'react-router-dom';

import { ChatMessage } from '..';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';

let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;

const ENDPOINT = 'http://localhost:4000';

export const Chat: React.FC<ChatProps> = () => {
  const userInfo = useRecoilValue(userInfoState);

  const params = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState(userInfo?.name);
  const [roomUsers, setRoomUsers] = useState<User[]>([]);

  const messagesRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit('join', { userName, roomId: params.roomId });

    socket.on('roomUsers', (users) => {
      setRoomUsers(users);
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket?.on('message', (data) => setMessages((prev) => [...prev, data]));
  }, []);

  const handleMessageSend = () => {
    socket?.emit('message', message);
    setMessage('');
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div data-testid="chat" className="flex flex-col bg-gray-100">
      <div className="flex w-screen h-screen">
        <div className="w-[15vw] h-full blue-glassmorphism">
          <h2 className="text-2xl font-bold underline ml-2 mt-2">Users</h2>
          <ul className="ml-2 mt-2">
            {roomUsers.map((user) => (
              <li key={user.id}>{user.userName}</li>
            ))}
          </ul>
        </div>
        <div className="w-full h-full  flex flex-col ">
          <h1 className="text-4xl font-bold ml-auto mr-auto my-5">
            Room {params.roomId}
          </h1>

          <div
            ref={messagesRef}
            className="h-max-[100vh] h-[100vh] overflow-scroll pb-10 no-scrollbar"
          >
            {messages &&
              messages.map((msg, i) => (
                <ChatMessage
                  message={msg.message}
                  name={msg.name}
                  time={msg.time}
                  key={`${i}-${msg}`}
                />
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
