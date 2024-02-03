import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SubProductCategoriesUseCase } from "./sub-product-categories.usecase";
import { productCategoryPath } from "../../../shared/routes";
import { productCategoryToDto } from "../../domain/product-category.interface";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Controller(productCategoryPath)
export class SubProductCategoriesController {
    constructor(
        @Inject(SubProductCategoriesUseCase)
        private readonly useCase : SubProductCategoriesUseCase,
    ){}

    @Get('/')
    async subProductCategories(
        @Query('parent') parent: ID,
        @Query('tree') tree: boolean
    ){

        const categories = await this.useCase.execute({ parent, tree: !!tree });
        return categories.map(productCategoryToDto);

    }
}