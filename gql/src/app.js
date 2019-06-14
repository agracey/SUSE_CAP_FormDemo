const { ApolloServer, gql } = require('apollo-server');

const Mutation = require('./mutations.js')

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }

  input Answer {
    key: String!
    value: String
  }

  input FormInput {
    answers: [Answer]!
    name: String!
    email: String!
    language: String
  }

  type Mutation {
    submitForm(form: FormInput!): String!
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world'
  },
  Mutation
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true, 
});

server.listen(8080).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});