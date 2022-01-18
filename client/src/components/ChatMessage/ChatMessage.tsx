import { ChatMessageProps } from './types';

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      data-testid="chat-message"
      className="flex flex-col items-start justify-start bg-red-500 rounded-lg border-none my-6 mx-10 p-2 px-5 blue-glassmorphism text-white"
    >
      <div className="flex items-center mb-1">
        <p className="text-bold text-sm text-black mr-2">{message?.name}</p>
        <p className="text-gray-700 text-xs">{message?.time}</p>
      </div>

      <p className="mb-1">{message?.message}</p>
    </div>
  );
};
