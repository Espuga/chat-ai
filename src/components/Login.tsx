import { useState } from "react";
import { useTranslation } from "react-i18next"


export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-400/50 z-50">

      <div className="border-1 border-gray-400 p-4 rounded-2xl bg-white w-96 h-72">
        <h3 className="text-2xl font-bold">{t('login')}</h3>

        <div className="flex flex-col gap-3">
          <div className="">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              className="w-full pb-2 mx-2 border-2 border-gray-300 bg-white"
            />
          </div>
        </div>

      </div>

    </div>
  )

}