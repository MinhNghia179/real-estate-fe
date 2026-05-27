import { en } from './en';
import { vi } from './vi';

export type Language = 'en' | 'vi';

export const translations = {
  en,
  vi,
} as const;

export const getTranslation = (lang: Language) => translations[lang];

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
];
