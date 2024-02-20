import { Inject, Injectable } from "@nestjs/common";
import { ProductCategoryService } from "../../domain/product-category.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class FindOneProductCategoryUsecase {
  constructor(
    @Inject(ProductCategoryService)
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  async execute(id: ID) {
    return this.productCategoryService.findByIdOrFail(id);
  }
}