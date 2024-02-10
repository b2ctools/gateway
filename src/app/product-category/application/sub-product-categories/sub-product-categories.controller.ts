import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SubProductCategoriesUseCase } from "./sub-product-categories.usecase";
import { productCategoryPath } from "../../../shared/routes";
import { productCategoryToDto, sortable } from "../../domain/product-category.interface";
import { SearchSubProductCategoriesOutput, SearchSubProductCategoryRequest } from "./sub-product-categories.request";

@Controller(productCategoryPath)
export class SubProductCategoriesController {
    constructor(
        @Inject(SubProductCategoriesUseCase)
        private readonly useCase : SubProductCategoriesUseCase,
    ){}

    @Get('/sub')
    async subProductCategories(
        @Query() request: SearchSubProductCategoryRequest
    ): Promise<SearchSubProductCategoriesOutput>{

        const categories = await this.useCase.execute(request);
        const data = categories.map(productCategoryToDto);
        return {
            data,
            count: data.length,
            sortable,
        }

    }
}