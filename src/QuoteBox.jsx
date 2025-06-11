import React, { useState } from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';

const getRandomJoke = async () => {
  const res = await fetch('https://official-joke-api.appspot.com/random_joke');
  if (!res.ok) throw new Error('Failed to fetch joke');
  const data = await res.json();
  if (!data?.setup || !data?.punchline) throw new Error('Incomplete joke data');
  return data;
};

const QuoteBox = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchJoke = async () => {
    setLoading(true);
    try {
      const data = await getRandomJoke();
      setJoke(data);
    } catch (error) {
      setJoke({ setup: 'Error', punchline: 'Could not fetch data' });
    } finally {
      setLoading(false);
    }
  };

  const getTweetLink = () => {
    if (!joke) return '#';
    const tweet = `${joke.setup} ${joke.punchline}`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-sm p-4 text-center" style={{ maxWidth: '500px', width: '100%' }}>
        <Card.Body>
          <Card.Title>Random Joke Machine</Card.Title>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : joke ? (
            <>
              <Card.Text><strong>{joke.setup}</strong></Card.Text>
              <Card.Text>{joke.punchline}</Card.Text>
              <a
                href={getTweetLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-info mt-2"
              >
                Share on Twitter
              </a>
            </>
          ) : (
            <Card.Text>Click the button to fetch a random joke!</Card.Text>
          )}
          <Button variant="primary" onClick={handleFetchJoke} className="mt-3 ms-2">
            Fetch Joke
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default QuoteBox;
