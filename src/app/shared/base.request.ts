import { ID } from "./abstract-repository/repository.interface";

export type IOrder = "asc" | "desc";

type TFieldName = 'createdAt' | 'updatedAt';

export interface SearchRequest {
  sortBy?: string;
  sortOrder?: IOrder;
  take?: number;
  skip?: number;
  fromDate?: Date;
  toDate?: Date;
  dateFieldName?: TFieldName;
  tenantId?: ID;
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

  const filter = (sortable && sortable.length > 0) ? getFilterFieldFromRequest(sortable, request) : {};

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

interface anyRequest {
  [key: string]: string;

}

export interface FilterToApply {
  field: string;
  value: string;
}

export const getFilterFieldFromRequest = (sortable: string[], request : anyRequest) => {
  const fieldOnRequest = sortable.find((field) => field in request)
  return fieldOnRequest ? {
    field: fieldOnRequest,
    value: request[fieldOnRequest]
  } : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyFilterFieldFromRequest = (list: any[], filter: FilterToApply ) => {
  if (!filter || !filter.field || !filter.value) return list;
  return list.filter((item) => item[filter.field].toLowerCase().includes(filter.value.toLowerCase()));
}