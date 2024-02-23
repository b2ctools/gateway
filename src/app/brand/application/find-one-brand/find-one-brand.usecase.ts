import { Inject, Injectable } from "@nestjs/common";
import { BrandService } from "../../domain/brand.service";
import { Brand } from "../../domain/brand.interface";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class FindOneBrandUseCase {
  constructor(
    @Inject(BrandService)
    private readonly brandService: BrandService,
  ) {}

  async execute(id: ID): Promise<Brand> {
    return this.brandService.findByIdOrFail(id);
  }
}
