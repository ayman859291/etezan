
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ArticleCard } from './components/ArticleCard';
import { NewsletterForm } from './components/NewsletterForm';
import { AdminPanel } from './components/AdminPanel';
import { Modal } from './components/Modal';
import { Article, Category, Page } from './types';
import { MOCK_ARTICLES, ADMIN_PASSWORD } from './constants';

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(MOCK_ARTICLES);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (selectedArticle) {
      document.title = `${selectedArticle.title} - مدونة إتزان`;
    } else if (selectedCategory) {
      document.title = `${selectedCategory} - مدونة إتزان`;
    } else {
      document.title = 'مدونة إتزان - نحو حياة متزنة';
    }
    window.scrollTo(0, 0);
  }, [currentPage, selectedArticle, selectedCategory]);
  
  const handleNavigate = (page: Page, category?: Category) => {
    setCurrentPage(page);
    if (page === 'category' && category) {
      setSelectedCategory(category);
      setSelectedArticle(null);
    } else if (page === 'home') {
      setSelectedCategory(null);
      setSelectedArticle(null);
    } else if (page === 'contact') {
        setIsContactModalOpen(true);
    }
  };

  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
    setCurrentPage('article');
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setIsLoginModalOpen(false);
      setPassword('');
      setIsAdminPanelOpen(true);
    } else {
      alert('رمز الدخول غير صحيح.');
    }
  };

  const handleAddArticle = (newArticleData: Omit<Article, 'id' | 'date'>) => {
    const newArticle: Article = {
      ...newArticleData,
      id: Date.now(),
      date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const renderContent = () => {
    if (currentPage === 'article' && selectedArticle) {
      return (
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          <button onClick={() => handleNavigate(selectedCategory ? 'category' : 'home', selectedCategory || undefined)} className="text-teal-600 hover:text-teal-800 mb-6">&larr; العودة</button>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{selectedArticle.title}</h1>
          <div className="text-gray-500 mb-4">
            <span>{selectedArticle.category}</span> &bull; <span>{selectedArticle.date}</span>
          </div>
          <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-full h-auto rounded-lg shadow-lg mb-8" />
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedArticle.content }}></div>
        </div>
      );
    }

    const articlesToDisplay = selectedCategory ? articles.filter(a => a.category === selectedCategory) : articles;
    return (
      <>
        <div className="container mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{selectedCategory || 'أحدث المقالات'}</h2>
          {articlesToDisplay.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articlesToDisplay.map(article => (
                <ArticleCard key={article.id} article={article} onArticleSelect={handleArticleSelect} />
                ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">لا توجد مقالات في هذا التصنيف حاليًا.</p>
          )}
        </div>
        {!selectedCategory && <NewsletterForm />}
      </>
    );
  };

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer onAdminLoginClick={() => setIsLoginModalOpen(true)} />
      
      {isAdminAuthenticated && (
        <button
            onClick={() => setIsAdminPanelOpen(true)}
            className="fixed bottom-6 left-6 bg-teal-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-teal-700 transition-transform transform hover:scale-110 z-40"
            title="إضافة مقال جديد"
        >
            +
        </button>
      )}

      <AdminPanel 
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        onAddArticle={handleAddArticle}
      />
      
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} title="دخول لوحة التحكم">
        <div className="space-y-4">
          <p className="text-gray-600">الرجاء إدخال رمز الدخول للوصول إلى لوحة التحكم.</p>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="رمز الدخول"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            دخول
          </button>
        </div>
      </Modal>

      <Modal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} title="تواصل معنا">
        <div className="space-y-4 text-gray-700">
          <p>نسعد بتواصلكم واقتراحاتكم. يمكنكم مراسلتنا عبر البريد الإلكتروني:</p>
          <p className="font-semibold text-teal-600 text-center text-lg">contact@etizan-blog.com</p>
          <p>أو متابعتنا على شبكات التواصل الاجتماعي (روابط وهمية):</p>
          <div className="flex justify-center space-x-4 space-x-reverse">
             <a href="#" className="text-gray-500 hover:text-teal-600">تويتر</a>
             <a href="#" className="text-gray-500 hover:text-teal-600">فيسبوك</a>
             <a href="#" className="text-gray-500 hover:text-teal-600">انستغرام</a>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default App;
