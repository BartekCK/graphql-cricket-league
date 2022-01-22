import { getRepository } from "typeorm";
import { Player } from "../entities/Player";
import { Team } from "../entities/Team";
import { dateScalar } from "../scalars";
import { Match } from "../entities/Match";
import { GraphQLResolveInfo } from "graphql/type/definition";

const playerRepository = getRepository(Player);
const teamRepository = getRepository(Team);
const matchRepository = getRepository(Match);

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

    matches: (_, { matchPlace }) => {
      const indexedFields = ["m.venue_name", "m.city_name", "m.host_country"];

      const query = matchRepository
        .createQueryBuilder("m")
        .addSelect(
          `similarity((${indexedFields.join("||")}), '${matchPlace}')`,
          "sml"
        );

      indexedFields.forEach((field) => {
        query.orWhere(`${field} % :place`, { place: matchPlace });
      });

      return query.orderBy("sml", "DESC").getMany();
    },
  },
};
