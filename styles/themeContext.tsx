import React, { createContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme as appThemeObject } from "@/styles/theme";
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  currentTheme: ThemeType;
  setCurrentTheme: (theme: ThemeType) => void;
  appTheme: typeof appThemeObject.light | typeof appThemeObject.dark;
}

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "auto",
  setCurrentTheme: () => { },
  appTheme: appThemeObject.light,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("auto");

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setCurrentTheme(savedTheme as ThemeType);
      }
    };
    loadTheme();
  }, []);

  const changeTheme = async (theme: ThemeType) => {
    await AsyncStorage.setItem("theme", theme);
    setCurrentTheme(theme);
  };

  const appTheme =
    currentTheme === "auto"
      ? systemColorScheme === "dark"
        ? appThemeObject.dark
        : appThemeObject.light
      : appThemeObject[currentTheme];

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme: changeTheme, appTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
