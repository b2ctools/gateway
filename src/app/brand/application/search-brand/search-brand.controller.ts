import { Controller, Get, Inject, Query } from "@nestjs/common";

import { BrandDto, sortable, brandToDto } from "../../domain/brand.interface";
import { brandPath } from "../../../shared/routes";
import { SearchOutput, SearchRequest } from "../../../shared/base.request";
import { SearchBrandUseCase } from "./search-brand.usecase";
@Controller(brandPath)
export class SearchStoreController {
  constructor(
    @Inject(SearchBrandUseCase)
    private readonly useCase: SearchBrandUseCase,
  ) {}

  @Get()
  async findAllBrands(
    @Query() request: SearchRequest,
  ): Promise<SearchOutput<BrandDto>> {
    const brands = (await this.useCase.execute(request)).map((b) =>
      brandToDto(b),
    );
    return {
      count: brands.length,
      data: brands,
      sortable,
    };
  }
}
