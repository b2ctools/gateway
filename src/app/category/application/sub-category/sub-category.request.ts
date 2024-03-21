import { ID } from "../../../shared/abstract-repository/repository.interface";
import { SearchOutput, SearchRequest } from "../../../shared/filters-and-request/base.request";
import { CategoryDTO } from "../../domain/category.interface";

export interface SearchSubCategoryRequest extends SearchRequest {
  parent: ID;
}

export class SearchSubCategoriesOutput
  implements SearchOutput<CategoryDTO>
{
  sortable: string[];
  data: CategoryDTO[];
  count: number;
}
