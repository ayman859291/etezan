
import React from 'react';

interface FooterProps {
  onAdminLoginClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminLoginClick }) => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-6 py-8 text-center text-gray-600">
        <p>
          جميع الحقوق محفوظة &copy; {new Date().getFullYear()} 
          <span className="font-bold text-teal-700 cursor-pointer" onClick={onAdminLoginClick}> مدونة إتزان</span>
        </p>
        <p className="text-sm mt-2">نسعى لنشر الوعي وبناء حياة هادئة ومتزنة</p>
      </div>
    </footer>
  );
};
