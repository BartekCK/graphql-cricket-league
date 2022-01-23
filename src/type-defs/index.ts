import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date
  
  input Pagination {
      offset: Int!
      limit: Int!
  }

  type Query {
    player(playerId: Int!): Player
    players(pagination: Pagination!): [Player!]!

    team(teamId: Int!): Team
    teams: [Team!]!

    matches(matchPlace: String!): [Match!]!
  }

  type Player {
    id: Int!
    name: String!
    dob: Date
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

  type Season {
    id: Int!
    year: String!
    orangeCapId: Int!
    purpleCapId: Int!
    manOfTheSeriesId: Int!
  }

  type Match {
    id: Int!
    matchDate: Date!
    teamId: Int!
    opponentTeamId: Int!
    seasonId: Int!
    season: Season!
    venueName: String!
    tossWinnerId: Int!
    tossDecision: String!
    isSuperOver: Boolean!
    isResult: Boolean!
    isDuckWorthLewis: Boolean!
    winType: String!
    wonByPlayerId: Int
    teamWinnerId: Int
    manOfTheMatchId: Int
    firstUmpireId: Int!
    secondUmpireId: Int!
    cityName: String!
    hostCountry: String!
  }
`;

export default typeDefs;
