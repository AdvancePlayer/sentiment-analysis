import React, { useContext } from "react";
import { ThemeContext } from "../context/theme.context";

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  console.log(darkMode)
  return (
    <nav className="w-full h-[70px] fixed top-0 left-0 z-50 bg-blue-100/80 backdrop-blur-sm text-black flex items-center justify-between px-4 md:px-8 shadow-md dark:shadow-gray-800 shadow-blue-200/50 dark:bg-gray-800">
    <div className="text-2xl font-bold text-blue-600">SentiScope</div>

        <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-sm font-medium">
            {darkMode ? "Dark" : "Light"} Mode
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer dark:bg-gray-700"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-all duration-300"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md peer-checked:translate-x-full transition-transform duration-300"></div>
            </label>
        </div>
    </nav>
  );
};

export default Navbar;
