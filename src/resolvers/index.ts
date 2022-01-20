import { getRepository } from "typeorm";
import { Player } from "../entities/Player";
import { Team } from "../entities/Team";

const playerRepository = getRepository(Player);
const teamRepository = getRepository(Team);

export const Resolvers = {
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
};
