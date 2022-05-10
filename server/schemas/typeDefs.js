// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
type Auth {
  token: ID!
  user: User
}

type User {
  _id: ID!
  username: String!
  email: String!
  gameCount: Int
  savedGames: [Game]
}

type Game {
  gameId: String!
  gameName: String
  artURL: String
}

input GameInput {
  gameId: String
  gameName: String
  artURL: String
}

type Query {
  me: User

}

type Mutation {
  login(email: String!, password: String!): Auth
  addUser(username: String!, email: String!, password: String!): Auth
  saveGame(gameData: GameInput): User
  removeGame(gameId: String!) : User
}
`;

// export the typeDefs
module.exports = typeDefs;