import React, { useEffect, useRef, useState } from 'react';
import { FaHeart, FaRegHeart, FaDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';

const QuoteCard = ({ quote, author, fontSize, themeColor, liked, onLike }) => {
  const [displayedQuote, setDisplayedQuote] = useState('');
  const quoteRef = useRef(null);

  useEffect(() => {
    setDisplayedQuote('');
    let index = 0;
    if (quote.length !== 0) {
      setDisplayedQuote((prev) => prev + quote[index]);
    }

    const interval = setInterval(() => {
      if (index < quote.length - 1) {
        setDisplayedQuote((prev) => prev + quote[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [quote]);

  const handleLike = () => {
    const stored = localStorage.getItem('likedQuotes');
    let likedQuotes = stored ? JSON.parse(stored) : [];

    const newQuote = { quote, author };

    if (liked) {
      likedQuotes = likedQuotes.filter(
        (q) => q.quote !== quote || q.author !== author
      );
    } else {
      likedQuotes.push(newQuote);
    }

    localStorage.setItem('likedQuotes', JSON.stringify(likedQuotes));
    onLike();
  };

  const handleDownload = () => {
    if (!quoteRef.current) return;
    html2canvas(quoteRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'quote.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  return (
    <div
      ref={quoteRef}
      className="rounded-2xl w-full md:w-1/2 md:mt-50 p-6 shadow-xl  transition duration-300"
      style={{ backgroundColor: themeColor }}
    >
      <p className={`text-${fontSize} text-white italic mb-4`}>
        "{displayedQuote}"
        <span className="animate-pulse">|</span>
      </p>
      <div className="flex justify-between items-center">
        <span className="text-white font-semibold">- {author || 'Unknown'}</span>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className="text-white text-xl hover:scale-110 transition"
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button
            onClick={handleDownload}
            className="text-white text-xl hover:scale-110 transition"
          >
            <FaDownload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
