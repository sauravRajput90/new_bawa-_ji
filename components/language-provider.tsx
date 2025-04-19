"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" }, // Hindi
  { code: "ta", name: "தமிழ்" }, // Tamil
  { code: "te", name: "తెలుగు" }, // Telugu
  { code: "mr", name: "मराठी" }, // Marathi
  { code: "gu", name: "ગુજરાતી" }, // Gujarati
  { code: "bn", name: "বাংলা" }, // Bengali
  { code: "ur", name: "اردو" }, // Urdu
  { code: "ml", name: "മലയാളം" }, // Malayalam
  { code: "kn", name: "ಕನ್ನಡ" }, // Kannada
]

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    home: "Home",
    features: "Features",
    about: "About",
    contact: "Contact",
    login: "Login",
    register: "Register",
    dashboard: "Dashboard",
    patients: "Patient Management",
    doctors: "Doctor Management",
    opd: "OPD Management",
    billing: "Billing & Payment",
    staff: "Staff & HR",
    inventory: "Inventory & Pharmacy",
    reports: "Reports & Analytics",
    settings: "Settings",
    notifications: "Notifications",
    logout: "Logout",
    createInvoice: "Create New Invoice",
    totalRevenue: "Total Revenue",
    pendingPayments: "Pending Payments",
    insuranceClaims: "Insurance Claims",
    viewInvoice: "View Invoice",
    printInvoice: "Print Invoice",
    downloadPDF: "Download PDF",
  },
  hi: {
    home: "होम",
    features: "विशेषताएँ",
    about: "हमारे बारे में",
    contact: "संपर्क करें",
    login: "लॉगिन",
    register: "रजिस्टर",
    dashboard: "डैशबोर्ड",
    patients: "रोगी प्रबंधन",
    doctors: "डॉक्टर प्रबंधन",
    opd: "ओपीडी प्रबंधन",
    billing: "बिलिंग और भुगतान",
    staff: "स्टाफ और एचआर",
    inventory: "इन्वेंटरी और फार्मेसी",
    reports: "रिपोर्ट और विश्लेषण",
    settings: "सेटिंग्स",
    notifications: "सूचनाएँ",
    logout: "लॉगआउट",
    createInvoice: "नया चालान बनाएँ",
    totalRevenue: "कुल राजस्व",
    pendingPayments: "लंबित भुगतान",
    insuranceClaims: "बीमा दावे",
    viewInvoice: "चालान देखें",
    printInvoice: "चालान प्रिंट करें",
    downloadPDF: "पीडीएफ डाउनलोड करें",
  },
  // Add translations for other languages as needed
  // For simplicity, I'm only including English and Hindi
  // In a real app, you would include all languages
}

// Default to English for other languages
for (const lang of languages) {
  if (!translations[lang.code]) {
    translations[lang.code] = translations.en
  }
}

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState("en")

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && languages.some((lang) => lang.code === savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)
