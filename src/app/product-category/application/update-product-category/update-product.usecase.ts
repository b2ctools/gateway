import { Inject, Injectable } from "@nestjs/common";
import { ProductCategoryService } from "../../domain/product-category.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class UpdateProductCategoryUseCse {
  constructor(
    @Inject(ProductCategoryService)
    private readonly pcService: ProductCategoryService,
  ) {}

  async execute({
    id,
    name,
    description,
  }: {
    id: ID;
    name?: string;
    description?: string;
  }) {
    return await this.pcService.updateProductCategory({
      id,
      name,
      description,
    });
  }
}
