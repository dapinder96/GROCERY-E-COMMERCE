const { gql } = require('apollo-server-express');
const countrySchema = require('./countrySchema');


const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [linkSchema, countrySchema];
