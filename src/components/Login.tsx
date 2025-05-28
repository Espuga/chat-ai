import { X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next"
import { useSessionStore } from "../stores/sessionStore";
import axios from "axios";
import { toast } from "sonner";

interface LoginProps {
  onClose: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const { t } = useTranslation();
  const sessionStore = useSessionStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

<<<<<<< HEAD
  const login = async () => {
    try {
      await sessionStore.login(email, password);
=======
  const login = () => {
    try {
      sessionStore.login(email, password);
>>>>>>> 58df0509a426ab94c17d6568827ed5ce4310d130
      toast.success(t('login_ok'));
      onClose();
    } catch (err) {
      console.error(err);
      if(axios.isAxiosError(err) && err.response?.status === 401) {
        toast.error(t('unauthorized'));
      } else {
        toast.error(t('login_no_ok'))
      }
    }
  }

  const closeLogin = () => {
    onClose();
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-400/50 z-50">

      <div className="relative border-1 border-gray-400 p-4 rounded-2xl bg-white w-96 h-72">
        <h3 className="text-2xl font-bold">{t('login')}</h3>

        <X size={32} onClick={closeLogin} className="absolute top-0 right-0 m-4 cursor-pointer" />

        <div className="flex flex-col gap-3 mt-2">
          <div className="">
            <label className="ml-1">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              className="w-full p-2 mx-0 border-1 border-gray-300 bg-white rounded-xl focus:outline-none"
            />
          </div>
          <div className="">
            <label className="ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  login();
                }
              }}
              className="w-full p-2 mx-0 border-1 border-gray-300 bg-white rounded-xl focus:outline-none"
            />
          </div>
          <div className="">
            <button
              onClick={login}
              className="w-full p-2 mx-0 border-1 border-gray-300 bg-white rounded-xl cursor-pointer"
            >{t('login')}</button>
          </div>
        </div>

      </div>

    </div>
  )

}