import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { getMe, handleDeleteGame } from '../utils/API';
import { removeGamesId } from '../utils/localStorage';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';

const SavedGames = () => {

  const [removeGames, { error }] = useMutation(REMOVE_GAME);

  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteGame = async (gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeGames({
        variables: { gameId },
      });

      removeGamesId(gameId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-dark bg-light'>
        <Container>
          <h1>Veiwing your Game Search!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedGames.length
            ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'}:`
            : 'You have no saved games!'}
        </h2>
        <CardColumns>
          {userData.savedGames.map((game) => {
            return (
              <Card key={game.gameId} border='dark'>
                {game.image ? <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{game.title}</Card.Title>
                  <p className='small'>Creators: {game.creators}</p>
                  <Card.Text>{game.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteGame(game.gameId)}>
                    Delete this Search!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedGames;
