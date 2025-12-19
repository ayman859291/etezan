
import React, from 'react';
import { Category } from '../types';

interface HeaderProps {
  onNavigate: (page: 'home' | 'category' | 'contact', category?: Category) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const categories: Category[] = [
    Category.Articles,
    Category.QuranicReflections,
    Category.PropheticSunnah,
    Category.SoulPurification,
    Category.FaithConcepts,
    Category.Media,
  ];

  const NavLink: React.FC<{
    children: React.ReactNode;
    onClick: () => void;
  }> = ({ children, onClick }) => (
    <button
      onClick={onClick}
      className="block md:inline-block py-2 px-3 text-gray-700 hover:text-teal-600 transition-colors duration-300"
    >
      {children}
    </button>
  );

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5 A10 10 0 0 0 12 2z"></path></svg>
            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => onNavigate('home')}>
              مدونة إتزان
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            <NavLink onClick={() => onNavigate('home')}>الرئيسية</NavLink>
            {categories.map(cat => (
              <NavLink key={cat} onClick={() => onNavigate('category', cat)}>{cat}</NavLink>
            ))}
          </nav>
          <div className="flex items-center">
             <button
              onClick={() => onNavigate('contact')}
              className="hidden md:block bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-300"
            >
              تواصل معنا
            </button>
            <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-2">
              <NavLink onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}>الرئيسية</NavLink>
              {categories.map(cat => (
                <NavLink key={cat} onClick={() => { onNavigate('category', cat); setIsMenuOpen(false); }}>{cat}</NavLink>
              ))}
               <button
                onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }}
                className="w-full text-right bg-teal-600 text-white py-2 px-3 rounded-lg hover:bg-teal-700 transition-colors duration-300 mt-2"
              >
                تواصل معنا
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
