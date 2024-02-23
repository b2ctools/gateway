import { Controller, Get, Inject, Param } from "@nestjs/common";
import { productCategoryPath } from "../../../shared/routes";
import { FindOneProductCategoryUsecase } from "./find-one-product-category.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { ProductCategoryDTO } from "../../domain/product-category.interface";

@Controller(productCategoryPath)
export class FindOneProductCategoryController {
  constructor(
    @Inject(FindOneProductCategoryUsecase)
    private readonly useCase: FindOneProductCategoryUsecase,
  ) {}

  @Get(":id")
  async findOne(@Param("id") id: ID): Promise<ProductCategoryDTO> {
    return await this.useCase.execute(id);
    
  }
}
