import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
//import { saveGames, searchGoogleGames } from '../utils/API';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';

//Specs
import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';

const SearchGames = () => {
 
  const [searchedGames, setSearchedGames] = useState([]);
 
  const [searchInput, setSearchInput] = useState('');

  
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

  const [saveGame, { error }] = useMutation(SAVE_GAME);
  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveGameIds(savedGameIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    let slug = searchInput.split(' ').join('-').toLowerCase();

    if (!searchInput) {
      return false;
    }

    console.log("Input is :   " + searchInput);
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=b84ccf2052cb47f282ee68d5c06e6991&dates=2022-01-01,2022-01-31&page_size=4&search=${slug}`
      );


      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { results } = await response.json();
      console.log(results);

      const gameData = results.map((game) => ({
        gameId: game.id,
        gameName: game.name,
        artURL: game.background_image,
      }));

      setSearchedGames(gameData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleSaveGame = async (gameId) => {
    
    const gameToSave = searchedGames.find((game) => game.gameId === gameId);
    console.log("Saving game: " + gameToSave.title + "  ID: " + gameToSave.gameId)
    console.log(gameToSave);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log("Token: " + token);

    if (!token) {
      return false;
    }

    try {
      const { data } =  await saveGame({
        variables: { gameData: { ...gameToSave } }, }
      );

      setSavedGameIds([...savedGameIds, gameToSave.gameId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-secondary'>
        <Container>
          <h1>Search for Games</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a game'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='info' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedGames.length
            ? `Viewing ${searchedGames.length} results:`
            : 'To begin, search for a game'}
        </h2>
        <CardColumns>
          {searchedGames.map((game) => {
            return (
              <Card key={game.gameId} border='dark'>
                {game.artURL ? (
                  <Card.Img src={game.artURL} alt={`The cover for ${game.gameName}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{game.gameName}</Card.Title>
                  <p className='small'>Authors: {game.authors}</p>
                  <Card.Text>{game.gameName}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedGameIds?.some((savedGameId) => savedGameId === game.gameId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveGame(game.gameId)}>
                      {savedGameIds?.some((savedGameId) => savedGameId === game.gameId)
                        ? 'This game has already been saved!'
                        : 'Save this Game!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchGames;
