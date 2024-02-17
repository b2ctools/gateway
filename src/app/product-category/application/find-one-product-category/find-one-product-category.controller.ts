import { Controller, Get, Inject, Param } from "@nestjs/common";
import { productCategoryPath } from "src/app/shared/routes";
import { FindOneProductCategoryUsecase } from "./find-one-product-category.usecase";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { productCategoryToDto } from "../../domain/product-category.interface";

@Controller(productCategoryPath)
export class FindOneProductCategoryController {
    constructor(
        @Inject(FindOneProductCategoryUsecase)
        private readonly useCase: FindOneProductCategoryUsecase,
    ) {}
    
    @Get(":id")
    async findOne(@Param('id') id: ID) {
        const pc = await this.useCase.execute(id);
        return productCategoryToDto(pc);
    }
}

