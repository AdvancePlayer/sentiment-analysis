import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) =>{

    const [darkMode,setDarkMode] = useState(()=>{
        return localStorage.getItem("sentiment-theme") === "dark";
    });
    
    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("sentiment-theme","dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("sentiment-theme","light");
        }
      }, [darkMode]);

    return <ThemeContext.Provider value={{darkMode,setDarkMode}}>
        {children}
    </ThemeContext.Provider>
}

