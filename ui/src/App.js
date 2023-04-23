import React, { useState } from "react";
import axios from "axios";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("IM HERE")
    // axios.post('http://localhost:7070/url', {originalUrl:originalUrl})
    //   .then((response) => {
    //     console.log('User created:', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error creating user:', error);
    //   });

    try {
      // Send POST request to create a short URL
      const res = await axios.post('http://localhost:7070/url', {originalUrl});

      // Set short URL in state
      setShortUrl(`http://localhost:7070/${res.data.shortUrl}`);
      setErrorMessage("");
    } catch (err) {
      // Set error message in state
      setErrorMessage(err.response.data);
      setShortUrl("");
    }
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Original URL:
          <input
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter URL"
            required
          />
        </label>

        <button type="submit">Shorten URL</button>
      </form>

      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default App;
