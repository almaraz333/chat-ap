import { ChatMessageProps } from './types';

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div
      data-testid="chat-message"
      className="bg-red-500 rounded-lg border-none my-6 mx-10 p-2 px-5 flex items-end blue-glassmorphism text-white"
    >
      <p>{message}</p>
    </div>
  );
};
