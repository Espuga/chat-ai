import { NavLink } from 'react-router-dom';
import { SquarePen } from 'lucide-react';
import ChatOption from './ChatOption';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import axios from 'axios';
import { useChatStore } from '../stores/chatStore';

export default function Sidebar() {
  const {t} = useTranslation();
  const { chats, setChats } = useChatStore();
  

  const loadChats = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/chat/`);
      setChats(res.data);
    } catch (err) {
      toast.error(t('error_getting_chat_messages'))
    }
  }

  useEffect(() => {
    if(Cookies.get('token')) {
      loadChats();
    }
  }, [])

  return (
    <nav className="w-60 p-4 pt-3 border-r-1 border-gray-200 h-full">
      <ul className="flex flex-col gap-1">
        <li>
          <NavLink 
            to="/chat"
            end
            className={({ isActive }) => 
              `flex gap-2 ${
                isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-700 hover:text-blue-500'
              }`
            }
          >
            <SquarePen />
            {t('new_chat')}
          </NavLink>
        </li>
        <hr className="border-gray-200 my-2"/>
        {chats.map(chat => (
          <li key={chat._id}>
            <ChatOption chat_id={chat._id} chat_description={chat.description} />
          </li>
        ))}
      </ul>
    </nav>
  );
}