import { NavLink } from 'react-router-dom';
import { SquarePen } from 'lucide-react';
import ChatOption from './ChatOption';

const chats = [
  {
    chat_id: "chat_id_1",
    chat_name: "Chat Name 1"
  },
  {
    chat_id: "chat_id_2",
    chat_name: "Another Chat"
  }
]

export default function Sidebar() {
  return (
    <nav className="w-60 p-4 pt-3 border-r-1 border-gray-200 h-full">
      <ul className="flex flex-col gap-1">
        <li>
          <NavLink 
            to="/"
            className={({ isActive }) => 
              `flex gap-2 ${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-700 hover:text-blue-500'
              }`
            }
          >
            <SquarePen />
            New Chat
          </NavLink>
        </li>
        <hr className="border-gray-200 my-2"/>
        {chats.map(chat => (
          <li key={chat.chat_id}>
            <ChatOption chat_id={chat.chat_id} chat_name={chat.chat_name} />
          </li>
        ))}
      </ul>
    </nav>
  );
}