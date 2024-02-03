import { Body, Controller, Inject, Patch } from "@nestjs/common";
import { UpdateProductCategoryUseCse } from "./update-product.usecase";
import { UpdateProductCategoryRequest } from "./update-product-category.request";
import { productCategoryToDto } from "../../domain/product-category.interface";
import { productCategoryPath } from "../../../shared/routes";

@Controller(productCategoryPath)
export class UpdateProductCategoryController {
    constructor(
        @Inject(UpdateProductCategoryUseCse)
        private readonly useCase: UpdateProductCategoryUseCse,
    ){}

    @Patch()
    async updateProductCategory(@Body() request: UpdateProductCategoryRequest){
        const { id, name, description} = request
        const pc = await this.useCase.execute({ id, name, description})
        return productCategoryToDto(pc);
    }
}