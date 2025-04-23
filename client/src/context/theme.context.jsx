import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) =>{

    const [darkMode,setDarkTheme] = useState(()=>{
        let stored = localStorage.getItem("sentiment-theme");
        if (!stored) {
          stored = "light"
        }
        return stored === "dark";
    });
    
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
          root.classList.add("dark");
          localStorage.setItem("sentiment-theme", "dark");
        } else {
          root.classList.remove("dark");
          localStorage.setItem("sentiment-theme", "light");
        }
      }, [darkMode]);

    return <ThemeContext.Provider value={{darkMode,setDarkTheme}}>
        {children}
    </ThemeContext.Provider>
}

