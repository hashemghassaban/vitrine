import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";

type Language = "fa" | "en";

interface LanguageContextType {
  currentLang: Language;
  setCurrentLang: React.Dispatch<React.SetStateAction<Language>>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'fa'; // Default
  }
  try {
    const savedLanguage = localStorage.getItem('app-language') as Language;
    return savedLanguage === 'fa' || savedLanguage === 'en' ? savedLanguage : 'fa';
  } catch (error) {
    console.warn("Failed to read language from localStorage:", error);
    return 'fa';
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLang, setCurrentLang] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem('app-language', currentLang);
    } catch (error) {
      console.warn("Failed to save language to localStorage:", error);
    }
  }, [currentLang]);
  
  const value: LanguageContextType = { currentLang, setCurrentLang };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
