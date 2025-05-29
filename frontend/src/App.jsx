import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuoteCard from './components/QuoteCard';
import ThemeToggle from './components/ThemeToggle';
import QuoteButton from './components/QuoteButton';

const App = () => {
  const [quoteData, setQuoteData] = useState({ quote: '', author: '' });
  const [likedQuotes, setLikedQuotes] = useState([]);
  const [showLikedModal, setShowLikedModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [fontSize, setFontSize] = useState('lg');
  const [isDark, setIsDark] = useState(true);

  const fetchQuote = async () => {
    try {
      const res = await axios.get('https://api.api-ninjas.com/v1/quotes', {
        headers: { 'X-Api-Key': '1aQkTFgpqF/hM4nAioMTTg==ayjDiwu2owDkWDcv' }
      });
      const { quote, author } = res.data[0];
      setQuoteData({ quote, author });
      console.log(quote, author);
    } catch (error) {
      console.error("Failed to fetch quote", error);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('likedQuotes');
    if (stored) {
      setLikedQuotes(JSON.parse(stored));
    }
    const isDark = localStorage.getItem('isDark') === 'true';
    setIsDark(isDark);
  }, []);

  useEffect(() => {
    const isLiked = likedQuotes.some(
      q => q.quote === quoteData.quote && q.author === quoteData.author
    );
    setLiked(isLiked);
  }, [quoteData, likedQuotes]);

  const toggleLike = () => {
    const newQuote = { quote: quoteData.quote, author: quoteData.author };
    let updated;

    if (liked) {
      updated = likedQuotes.filter(
        q => q.quote !== newQuote.quote || q.author !== newQuote.author
      );
    } else {
      updated = [...likedQuotes, newQuote];
    }

    setLikedQuotes(updated);
    localStorage.setItem('likedQuotes', JSON.stringify(updated));
    setLiked(!liked);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className={`min-h-screen transition duration-500 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
        <h1 className="text-xl font-bold hidden md:block ">Quote App</h1>
        <div className="flex space-x-4 items-center">
          <ThemeToggle isDark={isDark} toggleTheme={() => {
            localStorage.setItem('isDark', !isDark);
            setIsDark(!isDark)
          }} />
          <button
            onClick={() => setShowLikedModal(true)}
            className={`px-4 py-2 rounded-lg font-semibold shadow ${isDark ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'} hover:scale-105 transition`}
          >
            Liked Quotes
          </button>
        </div>
        
      </div>

      {/* Main Content Centered */}
      <div className="flex flex-col items-center justify-center px-4 py-8 space-y-6">
        <QuoteCard
          quote={quoteData.quote}
          author={quoteData.author}
          fontSize={fontSize}
          themeColor={isDark ? '#1f2937' : '#3b82f6'}
          liked={liked}
          onLike={toggleLike}
        />

        <div className="flex justify-center items-center space-x-4">
          <QuoteButton onClick={fetchQuote}>Click to New Quote</QuoteButton>

          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className={`border p-2 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
          >
            <option value="sm">Small</option>
            <option value="lg">Medium</option>
            <option value="xl">Large</option>
          </select>
        </div>
      </div>

      {/* Liked Quotes Modal */}
      {showLikedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`w-full max-w-lg bg-white text-black dark:bg-gray-800 dark:text-white rounded-lg p-6 shadow-lg`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Liked Quotes</h2>
              <button onClick={() => setShowLikedModal(false)} className="text-lg font-bold hover:text-red-500">✕</button>
            </div>
            {likedQuotes.length === 0 ? (
              <p>No liked quotes yet.</p>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {likedQuotes.map((q, idx) => (
                  <div key={idx} className="border-b pb-2">
                    <p className="italic">"{q.quote}"</p>
                    <p className="text-sm font-semibold">- {q.author || "Unknown"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
