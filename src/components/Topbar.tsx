import { User, Languages, Check, LogOut, LogIn, UserRoundPlus } from "lucide-react";
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useState } from "react";
import { useSessionStore } from "../stores/sessionStore";
import Login from "./Login";
import Register from "./Register";

const languages = [
  { code: "en", label: "English" },
  { code: "ca", label: "Català" },
];

export default function Topbar() {
  const { user, logout } = useSessionStore();
  const { t } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const currentLang = i18n.language;
  const [showSessionMenu, setShowSessionMenu] = useState(false);
  const [showLogin, setLogin] = useState(false);
  const [showRegister, setRegister] = useState(false);

  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      setShowSessionMenu(false);
    } catch (error) {
      console.error("Logout failed:",error);
    }
  }

  const handleLogin = (): void => {
    setShowSessionMenu(false);
    setLogin(!showLogin);
  }

  const handleRegister = (): void => {
    setShowSessionMenu(false);
    setRegister(!showRegister);
  }

  return (
    <header className="p-4 flex flex-row justify-between border-b-1 border-gray-200">
      <div className="flex flex-row gap-2 items-center">
        <img src="src/assets/react.svg" width="30px" />
        <h1 className="text-3xl font-bold">Chat AI</h1>
      </div>
      <div className="flex flex-row gap-2 items-center">
        {user && (
          <p className="text-xl">
            {t('hi')} {user.name}!
          </p>
        )}
        
        {/* User Session */}
        <div className="relative">
          <User 
            size={44} 
            onClick={() => {setShowSessionMenu(!showSessionMenu); setShowLangMenu(false);}}
            className="p-2 rounded-3xl hover:bg-gray-200 hover:cursor-pointer" 
          />
          {showSessionMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full pl-2 pr-4 py-2 text-left hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                >
                  <div className="flex flex-row gap-2">
                    <LogOut size={24} />
                    {t('logout')}
                  </div>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="w-full pl-2 pr-4 py-2 text-left hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  >
                    <div className="flex flex-row gap-2">
                      <LogIn size={24} />
                      {t('login')}
                    </div>
                  </button>
                  <button
                    onClick={handleRegister}
                    className="w-full pl-2 pr-4 py-2 text-left hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  >
                    <div className="flex flex-row gap-2">
                      <UserRoundPlus size={24} />
                      {t('register')}
                    </div>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Translations */}
        <div className="relative">
          <Languages
            size={44}
            onClick={() => {setShowLangMenu(!showLangMenu); setShowSessionMenu(false);}}
            className="p-2 rounded-3xl hover:bg-gray-200 cursor-pointer"
          />
          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={`w-full pl-2 pr-4 py-2 text-left hover:bg-gray-100 hover:cursor-pointer flex justify-between items-center ${
                    currentLang === code ? "font-semibold text-blue-600" : ""
                  }`}
                >
                  <div className="flex flex-row gap-2">
                    <img src={`/${code}.png`} alt="" width="25px" />
                    {label}

                  </div>
                  {currentLang === code && <Check size={22} />}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
      {showLogin ? <Login onClose={() => setLogin(false)} /> : null}
      {showRegister ? <Register onClose={() => setRegister(false)} /> : null}
    </header>
  );
}