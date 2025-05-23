import React from 'react';
import { NavLink } from 'react-router-dom';

interface ChatProps {
  chat_id: string,
  chat_name: string
}

const ChatOption: React.FC<ChatProps> = ({ chat_id, chat_name }) => {
  return (
    <NavLink 
      to={`/chat/${chat_id}`}
      className={({ isActive }) => 
        isActive
          ? 'text-blue-600 font-semibold'
          : 'text-gray-700 hover:text-blue-500'
      }
    >
      {chat_name}
    </NavLink>
  )
}

export default ChatOption;