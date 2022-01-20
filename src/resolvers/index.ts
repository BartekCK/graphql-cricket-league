import { getRepository } from "typeorm";
import { Player } from "../entities/Player";

const playerRepository = getRepository(Player);

export const Resolvers = {
  Query: {
    player: (_, args) => {
      const { playerId } = args;
      return playerRepository.findOne(playerId);
    },

    players: () => {
      return playerRepository.find();
    },
  },
};
