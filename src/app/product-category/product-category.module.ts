import { Module } from "@nestjs/common";
import { getProductCategoryRepo } from "./infrastructure/product-category.repo-provider";
import { AddProductCategoryController } from "./application/add-product-category/add-product-category.controller";
import { AddProductCategoryUseCase } from "./application/add-product-category/add-product-category.usecase";
import { ProductCategoryService } from "./domain/product-category.service";
import { SearchProductCategoryController } from "./application/search-product-categories/search-product-category.controller";
import { SearchProductCategoryUseCase } from "./application/search-product-categories/search-product-category.usecase";
import { RemoveProductCategoryController } from "./application/remove-product-category/remove-product-category.controller";
import { RemoveProductCategoryUseCase } from "./application/remove-product-category/remove-product-category.usecase";
import { UpdateProductCategoryController } from "./application/update-product-category/update-product.controller";
import { UpdateProductCategoryUseCse } from "./application/update-product-category/update-product.usecase";
import { MoveProductCateogoryController } from "./application/move-product-category/move-product-category.controller";
import { MoveProductCategoryUseCase } from "./application/move-product-category/move-product-category.usecase";
import { SubProductCategoriesController } from "./application/sub-product-categories/sub-product-categories.controller";
import { SubProductCategoriesUseCase } from "./application/sub-product-categories/sub-product-categories.usecase";

@Module({
  imports: [],
  controllers: [
    AddProductCategoryController,
    SearchProductCategoryController,
    RemoveProductCategoryController,
    UpdateProductCategoryController,
    MoveProductCateogoryController,
    SubProductCategoriesController,
  ],
  providers: [
    AddProductCategoryUseCase,
    SearchProductCategoryUseCase,
    RemoveProductCategoryUseCase,
    UpdateProductCategoryUseCse,
    MoveProductCategoryUseCase,
    ProductCategoryService,
    SubProductCategoriesUseCase,
    getProductCategoryRepo(),
  ],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
