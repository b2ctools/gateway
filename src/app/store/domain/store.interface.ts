import { codeFromId } from "src/app/shared/utils/gen-id";
import { IDomain } from "../../shared/abstract-repository/entities/domain";

export interface Store extends IDomain {
  name: string;
  description?: string;
}

export interface StoreDto extends Store {
  code : string;
}

export const storeToDto = (u: Store): StoreDto => {
  return {
    ...u,
    code: codeFromId(u.id),

  }
};

export const sortable = ["name", "description"];
