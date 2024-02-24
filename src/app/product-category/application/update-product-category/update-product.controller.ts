import { Body, Controller, Inject, Patch } from "@nestjs/common";
import { UpdateProductCategoryUseCse } from "./update-product.usecase";
import { UpdateProductCategoryRequest } from "./update-product-category.request";
import { productCategoryPath } from "../../../shared/routes";

@Controller(productCategoryPath)
export class UpdateProductCategoryController {
  constructor(
    @Inject(UpdateProductCategoryUseCse)
    private readonly useCase: UpdateProductCategoryUseCse,
  ) {}

  @Patch()
  async updateProductCategory(@Body() request: UpdateProductCategoryRequest) {
    return await this.useCase.execute(request);
  }
}
