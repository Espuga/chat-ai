import React from 'react';

interface MessageProps {
  message_id: string,
  content: string,
  role: string
}

const ChatMessage: React.FC<MessageProps> = ({ message_id, content, role }) => {
  return (
    <div className={`relative w-full flex ${
        role=='user'
          ? 'justify-end'
          : 'justify-start'
      }`}>
      <div className={`bg-gray-100 py-2 px-3 rounded-2xl inline-block `}>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default ChatMessage;