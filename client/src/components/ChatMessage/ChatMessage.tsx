import { ChatMessageProps } from './types';

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  name,
  time
}) => {
  const isSentByCurrentUser = name === 'Colton';
  return (
    <div
      data-testid="chat-message"
      className={`flex flex-col items-start justify-start bg-red-500 rounded-lg border-none w-max my-6 mx-10 p-2 px-5 ${
        isSentByCurrentUser
          ? 'blue-glassmorphism ml-auto'
          : 'white-glassmorphism mr-auto text-indigo-400'
      } text-black`}
    >
      <div className="flex items-center mb-1">
        <p
          className={`text-bold text-sm mr-2 ${
            isSentByCurrentUser ? 'text-white' : 'text-black'
          }`}
        >
          {name}
        </p>
        <p
          className={`text-xs ${
            isSentByCurrentUser ? 'text-white' : 'text-black'
          }`}
        >
          {time}
        </p>
      </div>

      <p
        className={`mb-1  ${isSentByCurrentUser ? 'text-white' : 'text-black'}`}
      >
        {message}
      </p>
    </div>
  );
};
