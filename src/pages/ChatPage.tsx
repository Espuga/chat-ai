import React, { useState } from 'react';
import { useParams } from 'react-router';
import InputChat from '../components/InputChat';
import ChatMessage from '../components/ChatMessage';

const ChatPage: React.FC = () => {
  const { chat_id } = useParams();

  const [messages, setMessages] = useState([
    {
      message_id: "message_id_1",
      content: "Message 1",
      role: "user"
    },
    {
      message_id: "message_id_2",
      content: "Message 2",
      role: "assistant"
    }
  ]);

  const handleNewMessage = (newContent: string) => {
    const newMessage = {
      message_id: crypto.randomUUID(),
      content: newContent,
      role: 'user'
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
  <>
    {chat_id ? (
      <div className='h-full w-full relative'>
        <div className='mx-62'>
          {messages.map((message) => (
            <ChatMessage
              key={message.message_id}
              message_id={message.message_id}
              content={message.content}
              role={message.role}
            />
          ))}
        </div>

        {/* Input Prompt */}
        <InputChat onSend={handleNewMessage} className="absolute bottom-0 left-1/2 transform -translate-x-1/2" />
      </div>
    ) : (
      <div className='h-full w-full relative flex items-center justify-center'>
        {/* Input Prompt */}
        <InputChat onSend={handleNewMessage} />
      </div>
    )}
  </>
);

}

export default ChatPage;