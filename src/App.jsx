import "./App.css";
import { useState, useEffect, useCallback } from "react";

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const newQuote = useCallback(() => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(quote?.text);
    setAuthor(quote?.author);
  }, [quotes]);

  const getQuotes = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      setQuotes(data);
    } catch (e) {
      console.log(e);
    }
  };

  const tweetQuote = useCallback(() => {
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
    window.open(twitterUrl, "_blank");
  }, [quote, author]);

  useEffect(() => {
    getQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length > 0) {
      newQuote();
    }
  }, [quotes, newQuote]);

  return (
    <>
      <div className='quote-container' id='quote-container'>
        {quote && (
          <div className='quote-text'>
            <i className='fas fa-quote-left' />
            <span id='quote'>{" " + quote}</span>
          </div>
        )}
        {author && (
          <div className='quote-author'>
            <span id='author'>- {author}</span>
          </div>
        )}
        <div className='button-container'>
          {quote && (
            <button
              className='twitter-button'
              id='twitter'
              title='Tweet this!'
              onClick={tweetQuote}
            >
              <i className='fab fa-twitter' />
            </button>
          )}

          <button className='new-quote' onClick={newQuote} id='new-quote'>
            New Quote
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
