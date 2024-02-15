import { SearchOutput, SearchRequest } from "../../../shared/base.request";
import { ProductCategoryDTO } from "../../domain/product-category.interface";

export interface SearchProductCategoryRequest extends SearchRequest {
  tree: boolean;
}

export class SearchProductCategoryOutput
  implements SearchOutput<ProductCategoryDTO>
{
  sortable: string[];
  data: ProductCategoryDTO[];
  count: number;
}
