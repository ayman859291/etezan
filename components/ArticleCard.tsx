
import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onArticleSelect: (article: Article) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onArticleSelect }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
      onClick={() => onArticleSelect(article)}
    >
      <div className="relative">
        <img className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300" src={article.imageUrl} alt={article.title} />
        <div className="absolute top-4 right-4 bg-teal-600 text-white text-sm font-semibold py-1 px-3 rounded-full">
          {article.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-700 transition-colors duration-300">{article.title}</h3>
        <p className="text-gray-600 leading-relaxed">{article.excerpt}</p>
        <div className="mt-4 text-sm text-gray-500">{article.date}</div>
      </div>
    </div>
  );
};
