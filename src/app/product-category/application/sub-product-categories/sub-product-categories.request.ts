import { ID } from "../../../shared/abstract-repository/repository.interface";
import { SearchOutput, SearchRequest } from "../../../shared/base.request";
import { ProductCategoryDTO } from "../../domain/product-category.interface";

export interface SearchSubProductCategoryRequest extends SearchRequest {
    parent: ID;
}

export class SearchSubProductCategoriesOutput implements SearchOutput<ProductCategoryDTO> {
    sortable: string[];
    data: ProductCategoryDTO[];
    count: number;

}