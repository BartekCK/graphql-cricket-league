import { getRepository } from "typeorm";
import { Player } from "../entities/Player";
import { Team } from "../entities/Team";
import { PlayerMatch } from "../entities/PlayerMatch";
import { dateScalar } from "../scalars";
import { Match } from "../entities/Match";
import { Season } from "../entities/Season";
import { GraphQLResolveInfo } from "graphql/type/definition";

const playerRepository = getRepository(Player);
const teamRepository = getRepository(Team);
const playerMatchRepository = getRepository(PlayerMatch);

export const Resolvers = {
  Date: dateScalar,
  Query: {
    player: (_, args) => {
      const { playerId } = args;
      return playerRepository.findOne(playerId);
    },

    players: (_, __, ___, info: GraphQLResolveInfo) => {
      return playerRepository.find();
    },

    teams: () => {
      return teamRepository.find();
    },
  },

  Player: {
    playedMatches: async ({ id }, args, context, info) => {
      const result = await playerMatchRepository.find({
        where: { playerId: id },
        relations: ["match", "team"],
      });
      return result;
    },
  },
};
