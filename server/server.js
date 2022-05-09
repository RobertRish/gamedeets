const express = require('express');
const path = require('path');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const request = require('request');

const async = require("async");
var accessToken = '';

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const { authMiddleware } = require('./utils/auth');

// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connecting to the twitch API

function gameRequest(accessToken){
  setTimeout(() => {
  const gameOptions = {
      url: 'https://api.twitch.tv/helix/games/top',
      method: 'GET',
      headers:{
          'Client-ID': 'lr3t63flx98zycubycppif1dcmop3v',
          'Authorization': 'Bearer ' + accessToken
      }
  }
  if(!accessToken){
      console.log("No Token");
  }else{
      console.log(gameOptions);
  
  const gameRequest = request.get(gameOptions,(err,res,body) => {
      if(err){
          return console.log(err);
      }
      
      console.log('Status: ${res.statusCode}');
      console.log(JSON.parse(body));
  });
  
  };
  
  },2000)
  }
const options = {
  url: 'https://id.twitch.tv/oauth2/token',
  json:true,
  body: {
  client_id: 'wlr3t63flx98zycubycppif1dcmop3v',
  client_secret: 'rzivmpo1echjark9pja49c5txcziq4',
  grant_type: 'client_credentials'
  }
};






request.post(options, (err,res,body)=>{
  if(err){
      return console.log(err);
  }
  console.log('Status: ${res.statusCode}');
  console.log(body.access_token);
  gameRequest(body.access_token);
  
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
await server.start();
// integrate our Apollo server with the Express application as middleware
server.applyMiddleware({ app });


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where we can go to test our GQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);