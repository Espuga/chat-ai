import { User, Languages, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="p-5 flex flex-row justify-between border-b-1 border-gray-200">
      <div className="flex flex-row gap-2 items-center">
        <img src="src/assets/react.svg" width="30px" />
        <h1 className="text-3xl font-bold">Chat AI</h1>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <p className="text-xl">Hi Marc!</p>
        <User size={38} className="p-2 rounded-3xl hover:bg-gray-200 hover:cursor-pointer" />
        <Languages size={38} className="p-2 rounded-3xl hover:bg-gray-200 hover:cursor-pointer" />
        <Bell size={38} className="p-2 rounded-3xl hover:bg-gray-200 hover:cursor-pointer" />
      </div>
    </header>
  );
}