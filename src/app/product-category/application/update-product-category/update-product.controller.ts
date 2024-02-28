import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { UpdateProductCategoryUseCse } from "./update-product.usecase";
import { UpdateProductCategoryRequest } from "./update-product-category.request";
import { productCategoryPath } from "../../../shared/routes";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(productCategoryPath)
export class UpdateProductCategoryController {
  constructor(
    @Inject(UpdateProductCategoryUseCse)
    private readonly useCase: UpdateProductCategoryUseCse,
  ) {}

  @Patch(":id")
  async updateProductCategory(
    @Param("id") id: ID,
    @Body() request: UpdateProductCategoryRequest,
  ) {
    return await this.useCase.execute(id, request);
  }
}
