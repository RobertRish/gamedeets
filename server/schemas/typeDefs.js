
const { gql } = require('apollo-server-express');


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
  description: String
  title: String
  image: String
  link: String
  authors: [String]
}

input GameInput {
  gameId: String
  authors: [String]
  title: String
  description: String
  image: String
  link: String
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


module.exports = typeDefs;