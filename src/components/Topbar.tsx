import { User, Languages, Check, LogOut } from "lucide-react";
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useState } from "react";

const languages = [
  { code: "en", label: "English" },
  { code: "ca", label: "Català" },
];

export default function Topbar() {
  const { t } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const currentLang = i18n.language;
  const [showSessionMenu, setShowSessionMenu] = useState(false);

  const changeLanguage = (lang: string): void => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
  };

  const logout = (): void => {

  }

  return (
    <header className="p-5 flex flex-row justify-between border-b-1 border-gray-200">
      <div className="flex flex-row gap-2 items-center">
        <img src="src/assets/react.svg" width="30px" />
        <h1 className="text-3xl font-bold">Chat AI</h1>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p className="text-xl">{t('hi')} Marc!</p>
        
        {/* User Session */}
        <div className="relative">
          <User 
            size={38} 
            onClick={() => {setShowSessionMenu(!showSessionMenu); setShowLangMenu(false);}}
            className="p-2 rounded-3xl hover:bg-gray-200 hover:cursor-pointer" 
          />
          {showSessionMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={() => logout()}
                className={`w-full pl-2 pr-4 py-2 text-left hover:bg-gray-100 hover:cursor-pointer flex justify-between items-center`}
              >
                <div className="flex flex-row gap-2">
                  <LogOut size={24} />
                  Logout
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Translations */}
        <div className="relative">
          <Languages
            size={38}
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
                    <img src={`public/${code}.png`} alt="" width="25px" />
                    {label}

                  </div>
                  {currentLang === code && <Check size={22} />}
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </header>
  );
}