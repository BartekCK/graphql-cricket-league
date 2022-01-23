interface PaginationInterface {
  offset: number;
  limit: number;
}

export type PaginationInput = { pagination: PaginationInterface };
