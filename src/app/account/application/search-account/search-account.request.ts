import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { SearchRequest } from "src/app/shared/base.request";

export interface SearchAccountRequest extends SearchRequest {
  userId: ID;
  storeId: ID;
}
