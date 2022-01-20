import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    player(playerId: Int!): Player
    players: [Player!]!
  }

  type Player {
    id: Int!
    name: String!
    dob: String
    battingHand: String
    bowlingSkill: String
    country: String!
    isUmpire: Boolean!
  }
`;

export default typeDefs;
