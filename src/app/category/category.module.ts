import { Module } from "@nestjs/common";
import { getCategoryRepo } from "./infrastructure/category.repo-provider";
import { AddCategoryController } from "./application/add-category/add-category.controller";
import { AddCategoryUseCase } from "./application/add-category/add-category.usecase";
import { CategoryService } from "./domain/category.service";
import { SearchCategoryController } from "./application/search-category/search-category.controller";
import { SearchCategoryUseCase } from "./application/search-category/search-category.usecase";
import { RemoveCategoryController } from "./application/remove-category/remove-category.controller";
import { RemoveCategoryUseCase } from "./application/remove-category/remove-category.usecase";
import { UpdateCategoryController } from "./application/update-category/update-category.controller";
import { UpdateCategoryUseCse } from "./application/update-category/update-category.usecase";
import { MoveProductCateogoryController } from "./application/move-category/move-category.controller";
import { MoveCategoryUseCase } from "./application/move-category/move-category.usecase";
import { SubCategoriesController } from "./application/sub-category/sub-category.controller";
import { SubCategoriesUseCase } from "./application/sub-category/sub-category.usecase";
import { FindOneCategoryController } from "./application/find-one-category/find-one-category.controller";
import { FindOneCategoryUsecase } from "./application/find-one-category/find-one-category.usecase";
import { TenantModule } from "../tenant/tenant.module";

@Module({
  imports: [TenantModule],
  controllers: [
    AddCategoryController,
    SearchCategoryController,
    RemoveCategoryController,
    UpdateCategoryController,
    MoveProductCateogoryController,
    SubCategoriesController,
    FindOneCategoryController,
  ],
  providers: [
    AddCategoryUseCase,
    SearchCategoryUseCase,
    RemoveCategoryUseCase,
    UpdateCategoryUseCse,
    MoveCategoryUseCase,
    CategoryService,
    SubCategoriesUseCase,
    getCategoryRepo(),
    FindOneCategoryUsecase,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
