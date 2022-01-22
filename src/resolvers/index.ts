import { getRepository } from "typeorm";
import { Player } from "../entities/Player";
import { Team } from "../entities/Team";
import { PlayerMatch } from "../entities/PlayerMatch";
import { dateScalar } from "../scalars";
import { Match } from "../entities/Match";

const playerRepository = getRepository(Player);
const teamRepository = getRepository(Team);
const playerMatchRepository = getRepository(PlayerMatch);
const matchRepository = getRepository(Match);

export const Resolvers = {
  Date: dateScalar,
  Query: {
    player: (_, args) => {
      const { playerId } = args;
      return playerRepository.findOne(playerId);
    },

    players: () => {
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
      });
      return result;
    },
  },

  PlayerMatch: {
    match: async ({ matchId }) => {
      return matchRepository.findOne(matchId);
    },

    team: async ({ teamId }) => {
      return teamRepository.findOne(teamId);
    },
  },
};
