import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date

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
    playedMatches: [PlayerMatch!]!
  }

  type Team {
    id: Int!
    teamName: String!
    teamCode: String!
  }

  type PlayerMatch {
    id: Int!
    matchId: Int!
    match: Match!
    teamId: Int!
    team: Team!
    isKeeper: Boolean!
    isCaptain: Boolean!
  }

  type Match {
    id: Int!
    matchDate: Date!
    cityName: String!
    hostCountry: String!
  }
`;

export default typeDefs;
