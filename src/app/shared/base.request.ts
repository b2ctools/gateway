import { BadRequestException } from "@nestjs/common";
import { isAdmin } from "../auth/domain/middleware/access-control";
import { ID } from "./abstract-repository/repository.interface";
import { ctxSrv } from "./context.service";

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
  filters?: FilterToApply[];
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

  const filters =
    sortable && sortable.length > 0
      ? getFiltersFromRequest(sortable, request)
      : {};
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

interface anyRequest {
  [key: string]: string;
}

export interface FilterToApply {
  field: string;
  value: string;
}

export const getFiltersFromRequest = (
  sortable: string[],
  request: anyRequest,
): FilterToApply[] => {
  return sortable.filter((field) => field in request)
    .map((field) => ({
        field,
        value: request[field],
    }));
};


const applyFilter = (  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[],
  filter: FilterToApply
) => {
  if (!filter || !filter.value || !filter.field) return list;
  return list.filter((item) =>
    item[filter.field].toLowerCase().includes(filter.value.toLowerCase()),
  );
}

export const applyFiltersFromRequest = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[],
  filter: FilterToApply[],
) => {
  if (!filter || filter.length === 0) return list;
  let result = list;
  filter.forEach((item) => {
    result = applyFilter(result, item);
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