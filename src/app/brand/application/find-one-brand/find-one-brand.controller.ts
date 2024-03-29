import { Controller, Get, Inject, Param } from "@nestjs/common";
import { brandPath } from "../../../shared/routes";
import { FindOneBrandUseCase } from "./find-one-brand.usecase";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { BrandDto } from "../../domain/brand.interface";

@Controller(brandPath)
export class FindOneBrandController {
  constructor(
    @Inject(FindOneBrandUseCase)
    private readonly useCase: FindOneBrandUseCase,
  ) {}

  @Get(":id")
  async findOneBrand(@Param("id") id: ID): Promise<BrandDto> {
    return this.useCase.execute(id);
  }
}
