import { Controller, Get, Inject, Param } from "@nestjs/common";
import { categoryPath } from "../../../shared/routes";
import { FindOneCategoryUsecase } from "./find-one-category.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { CategoryDTO } from "../../domain/category.interface";

@Controller(categoryPath)
export class FindOneCategoryController {
  constructor(
    @Inject(FindOneCategoryUsecase)
    private readonly useCase: FindOneCategoryUsecase,
  ) {}

  @Get(":id")
  async findOne(@Param("id") id: ID): Promise<CategoryDTO> {
    return await this.useCase.execute(id);
  }
}
