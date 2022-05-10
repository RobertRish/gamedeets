import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        gameCount
        savedGames {
          gameId
          gameName
          artURL
        }
      }
    }
  }
`;

export const SAVE_GAME = gql`
  mutation saveBook($gameData: GameInput!) {
    saveBook(gameData: $gameData) {
      _id
      username
      email
      savedGames {
        gameId
        gameName
        artURL
      }
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeBook($gameId: String!) {
    removeBook(gameId: $gameId) {
      _id
      username
      email
      savedGames {
        gameId
        gameName
        artURL
      }
    }
  }
`;
