/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException } from "@nestjs/common";
import { isAdmin } from "../../auth/domain/middleware/access-control";
import { ID } from "../abstract-repository/repository.interface";
import { ctxSrv } from "../context.service";
import { IFilter, SubStringFilter } from "./request-filters";

export type IOrder = "asc" | "desc";

type TFieldName = "createdAt" | "updatedAt";

export interface SearchRequest {
  sortBy?: string;
  sortOrder?: IOrder;
  take?: number;
  skip?: number;
  fromDate?: string;
  toDate?: string;
  dateFieldName?: TFieldName;
  tenantId?: ID;
  filters?: IFilter[];
}

export interface SearchOutput<T> {
  sortable: string[];
  data: T[];
  count: number;
}

const validDateString = (date: string): boolean => {
  return !isNaN(Date.parse(date));
}

export const sanitazeSearchQueryParams = <T extends SearchRequest>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: any,
  sortable: string[],
): T => {
  let sortOrder = (request && request.sortOrder) ? request.sortOrder : "";
  sortOrder = sortOrder.trim().toLowerCase();
  if (
    sortOrder &&
    sortOrder != "" &&
    sortOrder != "asc" &&
    sortOrder != "desc"
  ) {
    sortOrder = "desc";
  }

  const filters =
    sortable && sortable.length > 0
      ? buildSubStringFiltersFromSortableFieldsOnRequest(sortable, request)
      : [];
  console.log("=============================");
  console.log("filters", filters);
  console.log("=============================");

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
    filters,
    ...(validDateString(request.fromDate) ? { fromDate: request.fromDate } : {}),
    ...(validDateString(request.toDate) ? { toDate: request.toDate } : {}),
    // dateFieldName?: string;
  };
};




// export type FilterType = "subString" | "dateEqual" | "equal" | "boolean";


const buildSubStringFiltersFromSortableFieldsOnRequest = (
  sortable: string[],
  request: SearchRequest,
): IFilter[] => {
  // filter previously defined and present in the request
  const requestFilter: IFilter[] = request.filters || [];

  const filtersFromSortable =  sortable.filter((field) => field in request)
    .map((field) => new SubStringFilter(field, request[field]));

  return [...requestFilter, ...filtersFromSortable];
};

export const applyFiltersFromRequest = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[],
  filter: IFilter[],
) => {
  if (!filter || filter.length === 0) return list;
  let result = list;
  filter.forEach((filter) => {
    if (filter) result = filter.apply(list);
  });
  return result;
};

export const setTenantOnRequest = (sortable: string[], request: SearchRequest): {
  request: SearchRequest;
  sortable: string[];
} => {
    if (isAdmin()) {
    return { sortable, request }
  }

  const tenantId = ctxSrv.getTenantId();
  if (!tenantId) {
    throw new BadRequestException("TenantId is not specified. Please do account-login.");
  }

  return {
    request: {
      ...request,
      tenantId,
    },
    sortable: [...sortable, "tenantId"],
  };
}