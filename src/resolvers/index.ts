import { getRepository } from "typeorm";
import { Player } from "../entities/Player";
import { Team } from "../entities/Team";
import { PlayerMatch } from "../entities/PlayerMatch";
import { dateScalar } from "../scalars";
import { Match } from "../entities/Match";
import { Season } from "../entities/Season";
import { GraphQLResolveInfo } from "graphql/type/definition";
import { FieldNode } from "graphql/language/ast";

const playerRepository = getRepository(Player);
const teamRepository = getRepository(Team);
const playerMatchRepository = getRepository(PlayerMatch);

export const Resolvers = {
  Date: dateScalar,
  Query: {
    player: (_, args) => {
      const { playerId } = args;
      return playerRepository.findOne(playerId, {
        relations: [
          "playedMatches",
          "playedMatches.match",
          "playedMatches.team",
        ],
      });
    },
    players: (_, __, ___, info: GraphQLResolveInfo) => {
      return playerRepository.find({
        relations: [
          "playedMatches",
          "playedMatches.match",
          "playedMatches.team",
        ],
      });
    },

    team: (_, { teamId }) => {
      return teamRepository.findOne(teamId);
    },
    teams: () => {
      return teamRepository.find();
    },
  },
};
