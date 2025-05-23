import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface InputChatProps {
  onSend: (message: string) => void;
  className?: string;
}

const InputChat: React.FC<InputChatProps> = ({ onSend, className }) => {
  const {t} = useTranslation();
  const [message, setMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };
  
  const handleThinkToggle = () => {
    setIsThinking((prev) => !prev);
  };

  return (
    <div className={`bg-white p-4 border-1 border-gray-300 rounded-4xl w-full max-w-150 min-w-50 flex flex-col gap-2 ${className || ''}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus
          placeholder={t('type_your_prompt')}
          className="w-full pb-2 mx-2 border-none border-gray-300 focus:outline-none bg-white"
        />
      </form>
      <div className='flex flex-row'>
        <button
          type="button"
          onClick={handleThinkToggle}
          className={`px-2 pr-3 py-1 rounded-3xl transition flex flex-row gap-1 items-center cursor-pointer ${
            isThinking
              ? 'bg-blue-100 border-1 border-blue-300 text-blue-600 hover:bg-blue-200'
              : 'bg-white border-1 border-gray-300 text-gray-500 hover:bg-gray-200'
          }`}
          aria-pressed={isThinking}
        >
          <Sparkles className="w-5 h-5" />
          {t('think')}
        </button>
      </div>
    </div>
  )
}

export default InputChat;