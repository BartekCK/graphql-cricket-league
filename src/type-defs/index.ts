import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    player(playerId: Int!): Player
    players: [Player!]!
    teams: [Team!]!
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

  type Team {
    id: Int!
    teamName: String!
    teamCode: String!
  }
`;

export default typeDefs;
