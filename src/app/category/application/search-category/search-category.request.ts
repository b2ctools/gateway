import { SearchOutput, SearchRequest } from "../../../shared/base.request";
import { CategoryDTO } from "../../domain/category.interface";

export interface SearchCategoryRequest extends SearchRequest {
  tree?: boolean;
  sub?: boolean;
}

export class SearchCategoryOutput
  implements SearchOutput<CategoryDTO>
{
  sortable: string[];
  data: CategoryDTO[];
  count: number;
}
