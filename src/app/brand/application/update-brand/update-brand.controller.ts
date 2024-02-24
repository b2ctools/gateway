import { Body, Controller, Inject, Patch } from "@nestjs/common";
import { brandPath } from "../../../shared/routes";
import { BrandDto } from "../../domain/brand.interface";
import { UpdateBrandUseCse } from "./update-brand.usecase";
import { UpdateBrandRequest } from "./update-brand.request";

@Controller(brandPath)
export class UpdateBrandController {
  constructor(
    @Inject(UpdateBrandUseCse)
    private readonly useCase: UpdateBrandUseCse,
  ) {}

  @Patch()
  async updateBrand(@Body() request: UpdateBrandRequest): Promise<BrandDto> {
    return await this.useCase.execute(request);
  }
}
