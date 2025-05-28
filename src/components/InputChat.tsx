import React, { useEffect, useRef, useState } from 'react';
import { Database, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface InputChatProps {
  onSend: (message: string) => void;
  className?: string;
}

const InputChat: React.FC<InputChatProps> = ({ onSend, className }) => {
  const {t} = useTranslation();
  const [message, setMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isDoc, setIsDoc] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };
  
  const handleThinkToggle = () => {
    setIsThinking((prev) => !prev);
  };
  
  const handleDocToggle = () => {
    setIsDoc((prev) => !prev);
  };

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [message]);


  return (
    <div className={`bg-white p-4 border-1 border-gray-300 rounded-4xl w-full max-w-150 min-w-50 flex flex-col gap-2 ${className || ''}`}>
      <form onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          rows={1}
          autoFocus
          id='prompt-input'
          placeholder={t('type_your_prompt')}
          className="w-full pb-2 mx-2 pr-3 max-h-25 border-none border-gray-300 focus:outline-none bg-white resize-none"
        />
      </form>
      <div className='flex flex-row gap-2'>
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
        <button
          type="button"
          onClick={handleDocToggle}
          className={`px-2 pr-3 py-1 rounded-3xl transition flex flex-row gap-1 items-center cursor-pointer ${
            isDoc
              ? 'bg-blue-100 border-1 border-blue-300 text-blue-600 hover:bg-blue-200'
              : 'bg-white border-1 border-gray-300 text-gray-500 hover:bg-gray-200'
          }`}
          aria-pressed={isDoc}
        >
          <Database className="w-5 h-5" />
          {t('documentation')}
        </button>
      </div>
    </div>
  )
}

export default InputChat;