import { ID } from "../../../shared/abstract-repository/repository.interface";
import { SearchRequest } from "../../../shared/base.request";

export interface SearchAccountRequest extends SearchRequest {
  userId: ID;
  storeId: ID;
}
