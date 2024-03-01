import { Body, Controller, Inject, Post } from "@nestjs/common";
import { categoryPath } from "../../../shared/routes";
import { AddCategoryUseCase } from "./add-category.usecase";
import {
  AddCategoryJSONRequest,
  AddCategoryRequest,
} from "./add-category.request";
import { AddCategoryCommand } from "./add-category.command";
import { categoryToDto } from "../../domain/category.interface";

@Controller(categoryPath)
export class AddCategoryController {
  constructor(
    @Inject(AddCategoryUseCase)
    private readonly useCase: AddCategoryUseCase,
  ) {}

  @Post()
  async addCategory(@Body() request: AddCategoryRequest) {
    return await this.useCase.addCategory(
      new AddCategoryCommand(request),
    );
  }

  @Post("/json")
  async loadFromJson(@Body() request: AddCategoryJSONRequest) {
    const { categories: json } = request;
    const categories = await this.useCase.loadFromJson(JSON.stringify(json));
    return {
      message: "Product Categories succesfully added",
      categories: categories.map((c) => categoryToDto(c)),
    };
  }
}
