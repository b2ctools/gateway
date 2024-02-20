import { ID } from "./abstract-repository/repository.interface";
import { FilterToApply, getFilterFromRequest } from "./utils/string";

export type IOrder = "asc" | "desc";

export interface SearchRequest {
  sortBy?: string;
  sortOrder?: IOrder;
  take?: number;
  skip?: number;
  fromDate?: Date;
  toDate?: Date;
  dateFieldName?: string;
  tenantOnSearch?: ID;
  filter?: FilterToApply;
}

export interface SearchOutput<T> {
  sortable: string[];
  data: T[];
  count: number;
}

export const sanitazeSearchQueryParams = <T extends SearchRequest>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: any,
  sortable: string[],
): T => {
  let { sortOrder = "" } = request;
  sortOrder = sortOrder.trim().toLowerCase();
  if (
    sortOrder &&
    sortOrder != "" &&
    sortOrder != "asc" &&
    sortOrder != "desc"
  ) {
    sortOrder = "desc";
  }

  const filter = (sortable && sortable.length > 0) ? getFilterFromRequest(sortable, request) : {};

  return {
    ...request,
    // sortBy?: string;
    sortOrder,
    take:
      typeof request.take === "string"
        ? parseInt(request.take)
        : (request.take as number),
    skip:
      typeof request.skip === "string"
        ? parseInt(request.skip)
        : (request.skip as number),
    filter,
    // fromDate?: Date;
    // toDate?: Date;
    // dateFieldName?: string;
  };
};
