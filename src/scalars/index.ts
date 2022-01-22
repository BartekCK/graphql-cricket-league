import { GraphQLScalarType, ValueNode } from "graphql";

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date scalar type",
  serialize(value: string): string {
    return value;
  },
  parseValue(value: number) {
    return new Date(value);
  },
  parseLiteral(ast: ValueNode) {
    return null;
  },
});
