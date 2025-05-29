import React, { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const QuoteCard = ({ quote, author, fontSize, themeColor, liked, onLike }) => {
  const [displayedQuote, setDisplayedQuote] = useState('');
  
  useEffect(() => {
    setDisplayedQuote('');
    let index = 0;
    const interval = setInterval(() => {
      if (index < quote.length) {
        setDisplayedQuote((prev) => prev + quote[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30); // Adjust speed here (ms)
    
    return () => clearInterval(interval);
  }, [quote]);

  const handleLike = () => {
    const stored = localStorage.getItem('likedQuotes');
    let likedQuotes = stored ? JSON.parse(stored) : [];

    const newQuote = { quote, author };

    if (liked) {
      likedQuotes = likedQuotes.filter(q => q.quote !== quote || q.author !== author);
    } else {
      likedQuotes.push(newQuote);
    }

    localStorage.setItem('likedQuotes', JSON.stringify(likedQuotes));
    onLike();
  };

  return (
    <div
      className="rounded-2xl w-full md:w-1/2 md:mt-50 p-6 shadow-xl  transition duration-300"
      style={{ backgroundColor: themeColor }}
    >
      <p className={`text-${fontSize} text-white italic mb-4`}>
        "{displayedQuote}"
        <span className="animate-pulse">|</span>
      </p>
      <div className="flex justify-between items-center">
        <span className="text-white font-semibold">- {author || "Unknown"}</span>
        <button
          onClick={handleLike}
          className="text-white text-xl hover:scale-110 transition"
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};

export default QuoteCard;
