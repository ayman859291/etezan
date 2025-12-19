
import React, { useState } from 'react';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically handle the form submission, e.g., send to an API.
      console.log('Subscribed with email:', email);
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section className="bg-teal-50 py-16 px-6">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-teal-800 mb-4">انضم إلى النشرة البريدية</h2>
        <p className="text-teal-700 mb-8">
          كن أول من يتوصل بجديد المقالات والتأملات التي تساعدك على عيش حياة متزنة.
        </p>
        {submitted ? (
          <p className="text-green-700 font-semibold text-lg">شكرًا لانضمامك! تم تسجيل بريدك الإلكتروني بنجاح.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني"
              required
              className="w-full sm:w-80 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors duration-300"
            >
              اشتراك
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
