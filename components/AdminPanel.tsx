
import React, { useState } from 'react';
import { Article, Category } from '../types';
import { CATEGORIES } from '../constants';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddArticle: (article: Omit<Article, 'id' | 'date'>) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, onAddArticle }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>(Category.Articles);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !excerpt || !content) {
      alert('الرجاء ملء جميع الحقول المطلوبة.');
      return;
    }
    const finalImageUrl = imageUrl || `https://picsum.photos/seed/${Math.random()}/800/600`;
    
    // Simple HTML wrapping for content
    const formattedContent = content.split('\n').map(p => `<p class="mb-4">${p}</p>`).join('');

    onAddArticle({ title, category, excerpt, content: formattedContent, imageUrl: finalImageUrl });
    
    // Reset form and close
    setTitle('');
    setCategory(Category.Articles);
    setExcerpt('');
    setContent('');
    setImageUrl('');
    onClose();
  };

  const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      {children}
    </div>
  );
  
  const inputClasses = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-start pt-12 overflow-y-auto transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-2xl font-bold text-gray-800">إضافة مقال جديد</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
                <FormField label="عنوان المقال">
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputClasses} required />
                </FormField>
                <FormField label="التصنيف">
                    <select value={category} onChange={e => setCategory(e.target.value as Category)} className={inputClasses} required>
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </FormField>
                <FormField label="مقتطف (Excerpt)">
                    <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} className={inputClasses} rows={3} required />
                </FormField>
                <FormField label="المحتوى الكامل (يدعم فقرات منفصلة بسطر جديد)">
                    <textarea value={content} onChange={e => setContent(e.target.value)} className={inputClasses} rows={10} required />
                </FormField>
                <FormField label="رابط الصورة (اختياري)">
                    <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className={inputClasses} placeholder="https://picsum.photos/..." />
                </FormField>
                <div className="flex items-center justify-end mt-6">
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition-colors duration-300 ml-4">
                        إلغاء
                    </button>
                    <button type="submit" className="bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-700 transition-colors duration-300">
                        نشر المقال
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};
