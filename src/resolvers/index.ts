import { getRepository } from "typeorm";
import { Player } from "../entities/Player";
import { Team } from "../entities/Team";
import { dateScalar } from "../scalars";
import { Match } from "../entities/Match";
import { PaginationInput } from "../interfaces/pagination.interface";
import { UserInputError } from "apollo-server-express";

const playerRepository = getRepository(Player);
const teamRepository = getRepository(Team);
const matchRepository = getRepository(Match);

export const Resolvers = {
  Date: dateScalar,
  Query: {
    player: (_, { playerId }) => {
      return playerRepository.findOne(playerId, {
        relations: [
          "playedMatches",
          "playedMatches.match",
          "playedMatches.team",
        ],
      });
    },
    players: (_, args: PaginationInput) => {
      const { offset, limit } = args.pagination;
      if(limit > 20){
        throw new UserInputError(`Max "limit" value is 20`);
      }
      if(offset < 0) {
        throw new UserInputError(`Min "offset" value is 0`);
      }

      return playerRepository.find({
        relations: [
          "playedMatches",
          "playedMatches.match",
          "playedMatches.team",
        ],
        skip: offset,
        take: limit,
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
        .cache(5000)
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
