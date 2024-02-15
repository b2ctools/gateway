import { Inject, Injectable } from "@nestjs/common";
import { ProductCategoryService } from "../../domain/product-category.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RemoveProductCategoryUseCase {
  constructor(
    @Inject(ProductCategoryService)
    private readonly pcService: ProductCategoryService,
  ) {}

  async execute(id: ID) {
    await this.pcService.removeProductCategory(id);
  }
}
