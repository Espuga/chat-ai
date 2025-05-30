import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import InputChat from '../components/InputChat';
import ChatMessage from '../components/ChatMessage';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'sonner';
import { useChatStore } from '../stores/chatStore';

interface Message {
  _id: string;
  chat_id: string;
  role: string;
  message: string;
}

const ChatPage: React.FC = () => {
  const { t } = useTranslation();
  const { chat_id } = useParams();
  const { addChat } = useChatStore();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [waiting, setWaiting] = useState(false);

  const handleNewMessage = async (newContent: string) => {
    setWaiting(true);
    if(chat_id==null) {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`)
      const newChat = res.data;
      addChat(newChat);
      navigate(`/chat/${newChat._id}`);
    }
    const newMessage: Message = {
      _id: crypto.randomUUID(),
      chat_id: chat_id || '',
      role: 'user',
      message: newContent
    };
    setMessages([...messages, newMessage])
    
    try {
      let request = {
        chat_id: chat_id,
        role: 'user',
        message: newContent
      }
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat/message`, request);
      messages.splice(-1) // delete last message
      setMessages([...messages, res.data])
    } catch (err) {
      toast.error(t('error_prompt'))
    } finally {
      setWaiting(false);
    }

  };

  const loadMessages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/chat/${chat_id}/messages`);
      setMessages(res.data);
    } catch (err) {
      toast.error(t('error_getting_chat_messages'))
    }
  }

  useEffect(() => {
    if(chat_id) {
      loadMessages();
    }
  }, [chat_id])

  return (
  <>
    {chat_id ? (
      <div className='h-full w-full relative'>
        <div className='mx-62'>
          {messages.map((message) => (
            <ChatMessage
              key={message._id}
              message_id={message._id}
              content={message.message}
              role={message.role}
            />
          ))}
        </div>

        {/* Input Prompt */}
        <InputChat disabled={waiting} onSend={handleNewMessage} className="absolute bottom-0 left-1/2 transform -translate-x-1/2" />
      </div>
    ) : (
      <div className='h-full w-full relative flex flex-col items-center justify-center gap-5'>
        <p className='text-4xl'>{t('what_can_i_help_with')}</p>
        {/* Input Prompt */}
        <InputChat disabled={waiting} onSend={handleNewMessage} />
      </div>
    )}
  </>
);

}

export default ChatPage;