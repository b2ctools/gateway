import { Inject, Injectable } from "@nestjs/common";
import { BrandService } from "../../domain/brand.service";
import { SearchRequest } from "../../../shared/base.request";

@Injectable()
export class SearchBrandUseCase {
  constructor(
    @Inject(BrandService)
    private readonly brandService: BrandService,
  ) {}

  async execute(request: SearchRequest) {
    return await this.brandService.findAllBrands(request);
  }
}
