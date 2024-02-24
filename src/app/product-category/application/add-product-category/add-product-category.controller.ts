import { Body, Controller, Inject, Post } from "@nestjs/common";
import { productCategoryPath } from "../../../shared/routes";
import { AddProductCategoryUseCase } from "./add-product-category.usecase";
import {
  AddProductCategoryJSONRequest,
  AddProductCategoryRequest,
} from "./add-product-category.request";
import { AddProductCategoryCommand } from "./add-product-category.command";
import { productCategoryToDto } from "../../domain/product-category.interface";

@Controller(productCategoryPath)
export class AddProductCategoryController {
  constructor(
    @Inject(AddProductCategoryUseCase)
    private readonly useCase: AddProductCategoryUseCase,
  ) {}

  @Post()
  async addProductCategory(@Body() request: AddProductCategoryRequest) {
    return await this.useCase.addProductCategory(
      new AddProductCategoryCommand(request),
    );
  }

  @Post("/json")
  async loadFromJson(@Body() request: AddProductCategoryJSONRequest) {
    const { categories: json } = request;
    const categories = await this.useCase.loadFromJson(JSON.stringify(json));
    return {
      message: "Product Categories succesfully added",
      categories: categories.map((c) => productCategoryToDto(c)),
    };
  }
}
