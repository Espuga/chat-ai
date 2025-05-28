import { X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next"
import { useSessionStore } from "../stores/sessionStore";
import { toast } from "sonner";

interface RegisterProps {
  onClose: () => void;
}

export default function Register({ onClose }: RegisterProps) {
  const { t } = useTranslation();
  const sessionStore = useSessionStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await sessionStore.register(name, email, password);
      toast.success(t('register_ok'));
      onClose();
    } catch (err) {
      console.error(err);
      toast.success(t('register_no_ok'));
    }
  }

  const closeRegister = () => {
    onClose();
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-400/50 z-50">

      <div className="relative border-1 border-gray-400 p-4 rounded-2xl bg-white w-96 h-88">
        <h3 className="text-2xl font-bold">{t('register')}</h3>

        <X size={32} onClick={closeRegister} className="absolute top-0 right-0 m-4 cursor-pointer" />

        <div className="flex flex-col gap-3 mt-2">
          <div className="">
            <label className="ml-1">{t('name')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              className="w-full p-2 mx-0 border-1 border-gray-300 bg-white rounded-xl focus:outline-none"
            />
          </div>
          <div className="">
            <label className="ml-1">{t('email')}</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              className="w-full p-2 mx-0 border-1 border-gray-300 bg-white rounded-xl focus:outline-none"
            />
          </div>
          <div className="">
            <label className="ml-1">{t('password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mx-0 border-1 border-gray-300 bg-white rounded-xl focus:outline-none"
            />
          </div>
          <div className="">
            <button
              onClick={register}
              className="w-full p-2 mx-0 border-1 border-gray-300 bg-white rounded-xl cursor-pointer"
            >{t('register')}</button>
          </div>
        </div>

      </div>

    </div>
  )

}