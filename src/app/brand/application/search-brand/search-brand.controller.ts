import { Controller, Get, Inject, Query } from "@nestjs/common";

import { BrandDto } from "../../domain/brand.interface";
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
    return await this.useCase.execute(request);
    
  }
}
