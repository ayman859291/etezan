
export enum Category {
  Articles = "مقالات",
  QuranicReflections = "تأملات قرآنية",
  PropheticSunnah = "سنة نبوية",
  SoulPurification = "تزكية النفس",
  FaithConcepts = "مفاهيم إيمانية",
  Media = "صوتيات ومرئيات",
}

export interface Article {
  id: number;
  title: string;
  category: Category;
  imageUrl: string;
  excerpt: string;
  content: string;
  date: string;
}

export type Page = 'home' | 'category' | 'article' | 'contact';
