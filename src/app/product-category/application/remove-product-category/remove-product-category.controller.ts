import { Controller, Delete, Inject, Param } from "@nestjs/common";
import { productCategoryPath } from "../../../shared/routes";
import { RemoveProductCategoryUseCase } from "./remove-product-category.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Controller(productCategoryPath)
export class RemoveProductCategoryController {
  constructor(
    @Inject(RemoveProductCategoryUseCase)
    private readonly useCase: RemoveProductCategoryUseCase,
  ) {}

  @Delete("/:id")
  async removeProductCategory(@Param("id") id: ID) {
    await this.useCase.execute(id);
    return { message: "Product Category succesfully removed" };
  }
}
