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
        bookCount
        savedGames {
          authors
          gameId
          image
          link
          title
          description
        }
      }
    }
  }
`;

export const SAVE_GAME = gql`
  mutation saveGame($gameData: GameInput!) {
    saveGame(gameData: $gameData) {
      _id
      username
      email
      savedGames {
        gameId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const SAVE_GAME_OLD = gql`
  mutation saveBook($gameId: String!, $authors: [String], $title: String, $description: String, $image: String, $link: String) {
    saveGame(gameId: $gameId, authors: $authors, title: $title, description: $description, image: $image, link: $link) {
      _id
      username
      email
      savedGames {
        gameId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($gameId: String!) {
    removeGane(gameId: $gameId) {
      _id
      username
      email
      savedGames {
        gameId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
