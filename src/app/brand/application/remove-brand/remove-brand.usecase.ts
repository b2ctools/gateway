import { Inject, Injectable } from "@nestjs/common";
import { BrandService } from "../../domain/brand.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RemoveBrandUseCase {
  constructor(
    @Inject(BrandService)
    private readonly brandService: BrandService,
  ) {}

  async execute(brandId: ID) {
    await this.brandService.findByIdOrFail(brandId);
    await this.brandService.removeBrand(brandId);
  }
}
