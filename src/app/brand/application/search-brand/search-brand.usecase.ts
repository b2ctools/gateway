import { Inject, Injectable } from "@nestjs/common";
import { BrandService } from "../../domain/brand.service";
import {
  SearchRequest,
  sanitazeSearchQueryParams,
} from "../../../shared/base.request";
import { sortable } from "../../domain/brand.interface";

@Injectable()
export class SearchBrandUseCase {
  constructor(
    @Inject(BrandService)
    private readonly brandService: BrandService,
  ) {}

  async execute(request: SearchRequest) {
    return await this.brandService.findAllBrands(
      sanitazeSearchQueryParams<SearchRequest>(request, sortable),
    );
  }
}
