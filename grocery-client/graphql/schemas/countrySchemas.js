const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Country {
    id: Int!
    name: String!
  }

  type Query {
    getCountries: [Country]
  }

  type Mutation {
    addCountries(countries: [InputCountry]!): [Country]
  }

  input InputCountry {
    name: String!
  }
`;

module.exports = typeDefs;
