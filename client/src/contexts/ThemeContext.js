import React, {createContext, useState, useEffect} from 'react'

export const ThemeContext = createContext()

export const themes = {
  light: {
    background: '#e6e9eb',
    foreground: '#000'
  },
  dark: {
    background: '#2f303a',
    foreground: '#fff'
  }
}

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState({ light: true })

  useEffect(() => {
    if (localStorage.getItem('light') !== null) {
      const themevalue = localStorage.getItem('light') === 'false' ? false : true
      setTheme({
        light: themevalue
      })
    }
  }, [])
  
  const toggleTheme = () => {
    setTheme({ light: !theme.light });
    localStorage.setItem('light', !theme.light)
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider