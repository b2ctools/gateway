export const sanitizeEmail = (email: string) => {
  return email.toLowerCase().replace(/\s/g, "");
};


interface anyRequest {
  [key: string]: string;

}

export interface FilterToApply {
  field: string;
  value: string;
}

export const getFilterFromRequest = (sortable: string[], request : anyRequest) => {
  const fieldOnRequest = sortable.find((field) => field in request)
  return fieldOnRequest ? {
    field: fieldOnRequest,
    value: request[fieldOnRequest]
  } : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const applyFilteringFromRequest = (list: any[], filter: FilterToApply ) => {
  if (!filter || !filter.field || !filter.value) return list;
  return list.filter((item) => item[filter.field].toLowerCase().includes(filter.value.toLowerCase()));
}